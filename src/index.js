import { DI } from 'sham-ui';
import { storage } from './storage';
import Navigo from 'navigo';


/**
 * Router service
 * @example
 * import FooPage from '../components/FooPage.sht';
 * import BarPage from '../components/BarPage.sht';
 * import Router from 'sham-ui-router';
 *
 * const router = new Router();
 * router
 *     .bindPage(
 *         '/foo', // URL
 *         'foo', // Name
 *         FooPage, // Component class
 *         { componentOption: 1 } // Component options
 *     )
 *     .bindPage( '/bar/:some_param/detail', 'bar', BarPage, {} )
 *     .resolve();
 */
export default class Router {

    /**
     * @param {string|null} [root=null] Root URL
     * @param {boolean} [useHash=false] Use hash symbol as delimiter
     * @param {string} [hash='#'] Hash symbol (use useHash=true)
     */
    constructor( root = null, useHash = false, hash = '#' ) {
        DI.bind( 'router', this );
        /**
         * @type {RouterStorage}
         */
        this.storage = storage;
        this.router = new Navigo( root, useHash, hash );

        // Create proxy descriptor for _lastRouteResolved for set storage
        let _lastRouteResolved = null;
        Object.defineProperty( this.router, '_lastRouteResolved', {
            configurable: true,
            enumerable: true,
            get() {
                return _lastRouteResolved;
            },
            set( value ) {
                if ( null !== value ) {
                    storage.url = value.url;
                    storage.name = value.name;
                    storage.params = value.params || {};
                }
                _lastRouteResolved = value;
            }
        } );

        this._initProxyMethods();
    }


    /**
     * @private
     */
    _initProxyMethods() {

        /**
         * Resolve current url & run router
         * @memberof Router
         * @method
         * @name resolve
         */

        /**
         * Not found handler
         * @memberof Router
         * @method
         * @name notFound
         * @see https://github.com/krasimir/navigo#not-found-handler
         */

        /**
         * Changing the page
         * @memberof Router
         * @method
         * @name navigate
         * @param {string} url Destination url
         */

        /**
         * Hooks
         * @memberof Router
         * @method
         * @name hooks
         * @param {Object} hooks Object with hooks
         * @see https://github.com/krasimir/navigo#hooks
         */

        /**
         * Generate url for page
         * @memberof Router
         * @method
         * @name generate
         * @param {string} name
         * @param {Object} [params]
         * @see https://github.com/krasimir/navigo#named-routes
         * @example
         * router
         *     .bindPage( '/trip/:tripId/edit', 'trip.edit', PageComponent, {} )
         *     .bindPage( '/trip/save', 'trip.save', PageComponent, {} )
         *     .bindPage( '/trip/:action/:tripId', 'trip.action', PageComponent, {} );
         * console.log(router.generate('trip.edit', { tripId: 42 })); // --> /trip/42/edit
         * console.log(router.generate('trip.action', { tripId: 42, action: 'save' })); // --> /trip/save/42
         * console.log(router.generate('trip.save')); // --> /trip/save
         */

        [
            'resolve',
            'on',
            'off',
            'notFound',
            'navigate',
            'hooks',
            'destroy',
            'link',
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

    /**
     * Bind page component & url
     * @param {string} url Url for page
     * @param {string} name Page name*
     * @param {Class<Component>} pageComponent Component for page
     * @param {Object} componentOptions Options for component
     * @return {Router}
     */
    bindPage( url, name, pageComponent, componentOptions ) {
        this.on( url, {
            as: name,
            uses: () => {
                this.storage.activePageComponent = pageComponent;
                this.storage.activePageOptions = componentOptions;
                this.storage.sync();
            },
            ...componentOptions
        } );
        return this;
    }
}
