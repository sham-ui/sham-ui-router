import { DI } from 'sham-ui';
import { storage } from './storage';
import Navigo from 'navigo';

export default class Router {
    constructor( root = null, useHash = false, hash = '#' ) {
        DI.bind( 'router', this );
        this.storage = storage;
        this.router = new Navigo( root, useHash, hash );
        this._initProxyMethods();
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
                this.storage.activePageComponent = pageComponent;
                this.storage.activePageOptions = componentOptions;
                this.storage.url = url;
                this.storage.name = name;
                const lastRoute = this.lastRouteResolved();
                this.storage.params = lastRoute === undefined ? {} : lastRoute.params;
                this.storage.sync();
            },
            ...componentOptions
        } );
        return this;
    }
}
