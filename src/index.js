import { DI, inject } from 'sham-ui';
import Navigo from 'navigo';

export default class Router {
    @inject UI = 'sham-ui';

    constructor( root = null, useHash = false, hash = '#', autoResolve = true ) {
        DI.bind( 'router', this );
        this.router = new Navigo( root, useHash, hash );
        this._initProxyMethods();
        this.activePageWidget = null;
        this.activePageOptions = null;
        this.activePageLinks = new Set();
        if ( autoResolve ) {
            this.UI.render.on( 'RegistrationComplete', () => this.resolve() );
        }
    }

    _initProxyMethods() {
        [
            'resolve',
            'on',
            'off',
            'notFound',
            'navigate',
            'hooks',
            'destroy',
            'link',
            'lastRouteResolved',
            'generate'
        ].forEach( methodName => {
            Object.defineProperty( this, methodName, {
                value: function() {
                    return this.router[ methodName ].apply( this.router, arguments )
                },
                configurable: true,
                enumerable: true,
                writable: true
            } );
        } );
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

    _registerActivePageLink( widget ) {
        this.activePageLinks.add( widget );
    }

    _unregisterActivePageLink( widget ) {
        this.activePageLinks.delete( widget );
    }
}