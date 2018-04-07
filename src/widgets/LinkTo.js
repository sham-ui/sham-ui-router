import { DI, inject, options } from 'sham-ui';
import LinkToWidget from './LinkTo.sht';

export default class extends LinkToWidget {
    @inject router = 'router';

    @options
    get text() {
        return '';
    }

    @options
    get params() {
        return {}
    }

    @options
    get useActiveClass() {
        return false;
    }

    @options
    get activeClass() {
        return 'active';
    }

    @options
    get className() {
        return '';
    }

    generateURL( path, params ) {
        return this.lastGeneratedURL = this.router.generate( path, params );
    }

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

    bindEvents() {
        this.__bindedClick = this._click.bind( this );
        this.aNode.addEventListener(
            'click',
            this.__bindedClick
        )
    }

    destroy() {
        this.aNode.removeEventListener( 'click', this.__bindedClick );
        this._removeFromRouter();
    }

    remove() {
        this.aNode.removeEventListener( 'click', this.__bindedClick );
        super.remove( ...arguments );
        this._removeFromRouter();
    }

    _click( e ) {
        e.preventDefault();
        this.router.navigate( this.aNode.getAttribute( 'href' ) );
    }
}