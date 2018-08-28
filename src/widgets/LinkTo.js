import { inject, options } from 'sham-ui';
import { onclick } from 'sham-ui-directives';
import LinkToWidgetTemplate from './LinkTo.sht';

export default class LinkToWidget extends LinkToWidgetTemplate {
    constructor( selector, id, options ) {
        super( selector, id, {
            ...options,
            directives: {
                onclick,
                ...options.directives
            }
        } );
    }

    @inject router = 'router';

    @options get text() {
        return '';
    }
    @options get params() {
        return {};
    }
    @options get useActiveClass() {
        return false;
    }
    @options get activeClass() {
        return 'active';
    }
    @options get className() {
        return '';
    }

    generateURL( path, params ) {
        return this.lastGeneratedURL = this.router.generate( path, params );
    }

    // eslint-disable-next-line no-unused-vars
    isActive( path, params ) {
        return this.lastGeneratedURL === this.router.lastRouteResolved().url;
    }
    _registryInRouter() {
        if ( this.options.useActiveClass ) {
            this.router._registerActivePageLink( this );
        }
    }
    _removeFromRouter() {
        if ( this.options.useActiveClass ) {
            this.router._unregisterActivePageLink( this );
        }
    }
    get aNode() {
        return this.querySelector( 'a' );
    }
    update() {
        super.update( ...arguments );
        this._registryInRouter();
    }
    destroy() {
        this._removeFromRouter();
    }
    remove() {
        super.remove( ...arguments );
        this._removeFromRouter();
    }
    click( e ) {
        e.preventDefault();
        this.router.navigate( this.aNode.getAttribute( 'href' ) );
    }
}
