/**
 * Directive for links
 * @example
 * ...
 *   <a :hrefto={{ {"path": "foo",  "params": params} }} class="custom-class-1 custom-class-2">
 *     Foo
 *   </a>
 * ....
 */
export default class HrefTo {
    constructor( component ) {
        this.router = component.DI.resolve( 'router' );
        this.node = null;
        this.activeClass = null;
        this.lastGeneratedURL = null;
        this.urlWatching = false;
        this.click = this.click.bind( this );
        this.toggleActiveClass = this.toggleActiveClass.bind( this );
    }

    bind( node ) {
        this.node = node;
        node.addEventListener( 'click', this.click );
    }

    unbind( node ) {
        node.removeEventListener( 'click', this.click );
        this.node = null;
        this.activeClass = null;
        this.lastGeneratedURL = null;
        this._unbindRouteChangedListener();
    }

    _unbindRouteChangedListener() {
        if ( this.urlWatching ) {
            this.router.storage.removeWatcher( 'url', this.toggleActiveClass );
            this.urlWatching = false;
        }
    }

    update( { path, params = {}, useActiveClass = false, activeClass = 'active' } ) {
        this.activeClass = activeClass;
        const url = this.router.generate( path, params );
        this.lastGeneratedURL = url.replace( /\/+$/, '' );
        this.node.href = url;
        if ( useActiveClass ) {
            this.toggleActiveClass();
            if ( !this.urlWatching ) {
                this.urlWatching = true;
                this.router.storage.addWatcher( 'url', this.toggleActiveClass );
            }
        } else {
            this._unbindRouteChangedListener();
        }
    }

    toggleActiveClass() {
        if ( this.lastGeneratedURL === this.router.storage.url.replace( /\/+$/, '' ) ) {
            this.node.classList.add( this.activeClass );
        } else {
            this.node.classList.remove( this.activeClass );
        }
    }

    click( e ) {
        e.preventDefault();
        this.router.navigate( this.node.getAttribute( 'href' ) );
    }
}
