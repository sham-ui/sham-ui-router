import { inject } from 'sham-ui';

export default class HrefTo {
    @inject router;
    @inject( 'sham-ui' ) UI;

    constructor() {
        this.node = null;
        this.activeClass = null;
        this.lastGeneratedURL = null;
        this.routeChangedListener = null;
        this.click = this.click.bind( this );
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
        if ( null !== this.routeChangedListener ) {
            this.routeChangedListener.off();
            this.routeChangedListener = null;
        }
    }

    update( { path, params = {}, useActiveClass = false, activeClass = 'active' } ) {
        this.activeClass = activeClass;
        const url = this.router.generate( path, params );
        this.lastGeneratedURL = url;
        this.node.href = url;
        if ( useActiveClass ) {
            this.toggleActiveClass();
            if ( null === this.routeChangedListener ) {
                this.routeChangedListener = this.UI.render.on(
                    'RouteChanged',
                    ::this.toggleActiveClass
                );
            }
        } else {
            this._unbindRouteChangedListener();
        }
    }

    toggleActiveClass() {
        if ( this.lastGeneratedURL === this.router.lastRouteResolved().url ) {
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
