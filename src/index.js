import { DI, inject } from 'sham-ui';
import Navigo from 'navigo';

export default class Router {
    @inject( 'sham-ui' ) UI;

    constructor( root = null, useHash = false, hash = '#', autoResolve = true ) {
        DI.bind( 'router', this );
        this.router = new Navigo( root, useHash, hash );
        this._initProxyMethods();
        this.activePageComponent = null;
        this.activePageOptions = null;
        if ( autoResolve ) {
            this.UI.render.one( 'RegistrationComplete', () => this.resolve() );
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
                    return this.router[ methodName ].apply( this.router, arguments );
                },
                configurable: true,
                enumerable: true,
                writable: true
            } );
        } );
    }

    bindPage( url, name, pageComponent, componentOptions ) {
        this.on( url, {
            as: name,
            uses: () => {
                this.activePageComponent = pageComponent;
                this.activePageOptions = componentOptions;
                this._renderActivatePage();
            },
            ...componentOptions
        } );
        return this;
    }

    _renderActivatePage() {
        this.UI.render.ONLY_TYPES( ACTIVE_PAGE_CONTAINER_TYPE );
        this.UI.render.ONLY_TYPES( ACTIVE_PAGE_LINK_TYPE );
        this.UI.render.emit( 'RouteChanged' );
    }
}
