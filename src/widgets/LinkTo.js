import { inject, options } from 'sham-ui';
import { onclick, ref } from 'sham-ui-directives';
import LinkToWidgetTemplate from './LinkTo.sht';
import { ACTIVE_PAGE_LINK_TYPE } from '../settings';

export default class LinkToWidget extends LinkToWidgetTemplate {
    constructor( options ) {
        super( {
            ...options,
            directives: {
                onclick,
                ref,
                ...options.directives
            }
        } );
    }

    @inject router;
    @inject( 'sham-ui:store' ) widgetStore;

    @options text = '';
    @options useActiveClass = false;
    @options activeClass = 'active';
    @options className = '';

    @options get params() {
        return {};
    }

    generateURL( path, params ) {
        return this.lastGeneratedURL = this.router.generate( path, params );
    }

    // eslint-disable-next-line no-unused-vars
    isActive( path, params ) {
        return this.lastGeneratedURL === this.router.lastRouteResolved().url;
    }

    generateClassName( className, useActiveClass, activeClass, path, params ) {
        return [
            className,
            useActiveClass && this.isActive( path, params ) ? activeClass : ''
        ].join( ' ' ).trim();
    }

    _registryType() {
        const storeHasType = this.widgetStore.byType.has( ACTIVE_PAGE_LINK_TYPE );
        if ( this.options.useActiveClass ) {
            if ( !storeHasType ) {
                this.widgetStore.byType.set( ACTIVE_PAGE_LINK_TYPE, new Set() );
            }
            this.widgetStore.byType.get( ACTIVE_PAGE_LINK_TYPE ).add( this );
        } else if ( storeHasType ) {
            this.widgetStore.byType.get( ACTIVE_PAGE_LINK_TYPE ).delete( this );
        }
    }

    update() {
        super.update( ...arguments );
        this._registryType();
    }

    click( e ) {
        e.preventDefault();
        this.router.navigate( this.aNode.getAttribute( 'href' ) );
    }
}
