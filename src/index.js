import { DI, inject } from 'sham-ui';
import Navigo from 'navigo';

export default class Router {
    @inject UI = 'sham-ui';

    constructor( root = null, useHash = false, hash = '#', autoResolve = true ) {
        DI.bind( 'router', this );
        this.router = new Navigo( root, useHash, hash );
        this.activePageWidget = null;
        this.activePageOptions = null;
        this.activePageLinks = new Set();
        if ( autoResolve ) {
            this.UI.render.on( 'RegistrationComplete', this.resolve.bind( this ) );
        }
    }

    resolve() {
        this.router.resolve();
    }

    bindPage( url, name, pageWidget, widgetOptions ) {
        this.on( url, {
            as: name,
            uses: () => {
                this.activePageWidget = pageWidget;
                this.activePageOptions = widgetOptions;
                this._renderActivatePage();
            }
        } );
        return this;
    }

    _renderActivatePage() {
        const widget = DI.resolve( 'widgets:active-page-container' );
        if ( undefined !== widget ) {
            this.UI.render.ONLY( widget.ID );
            this.activePageLinks.forEach( x => x.update() )
        }
    }

    on() {
        this.router.on.apply( this.router, arguments );
    }

    off() {
        this.router.off.apply( this.router, arguments );
    }

    notFound() {
        this.router.notFound.apply( this.router, arguments );
    }

    navigate() {
        this.router.navigate.apply( this.router, arguments );
    }

    hooks() {
        this.router.hooks.apply( this.router, arguments );
    }

    destroy() {
        this.router.destroy.apply( this.router, arguments )
    }

    link() {
        return this.router.link.apply( this.router, arguments );
    }

    lastRouteResolved() {
        return this.router.lastRouteResolved.apply( this.router, arguments );
    }

    generate() {
        return this.router.generate.apply( this.router, arguments );
    }

    _registerActivePageLink( widget ) {
        this.activePageLinks.add( widget );
    }

    _unregisterActivePageLink( widget ) {
        this.activePageLinks.delete( widget );
    }
}