import { DI, inject } from 'sham-ui';
import Navigo from 'navigo';
import { ACTIVE_PAGE_LINK_TYPE, ACTIVE_PAGE_CONTAINER_ID } from './settings';

export default class Router {
    @inject( 'sham-ui' ) UI;

    constructor( root = null, useHash = false, hash = '#', autoResolve = true ) {
        DI.bind( 'router', this );
        this.router = new Navigo( root, useHash, hash );
        this._initProxyMethods();
        this.activePageWidget = null;
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
        this.UI.render.ONLY_IDS( ACTIVE_PAGE_CONTAINER_ID );
        this.UI.render.ONLY_TYPES( ACTIVE_PAGE_LINK_TYPE );
    }
}
