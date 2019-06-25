import { inject, options } from 'sham-ui';
import { onclick, ref } from 'sham-ui-directives';
import LinkToComponentTemplate from './LinkTo.sht';

export default class LinkToComponent extends LinkToComponentTemplate {
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
    @inject( 'sham-ui:store' ) componentStore;

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
        const activeLinkType = ACTIVE_PAGE_LINK_TYPE;
        const storeHasType = this.componentStore.byType.has( activeLinkType );
        if ( this.options.useActiveClass ) {
            if ( !storeHasType ) {
                this.componentStore.byType.set( activeLinkType, new Set() );
            }
            this.componentStore.byType.get( activeLinkType ).add( this );
        } else if ( storeHasType ) {
            this.componentStore.byType.get( activeLinkType ).delete( this );
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
