import createStorage from 'sham-ui-data-storage';
/**
 * Data storage for router service
 * @see https://github.com/sham-ui/sham-ui-data-storage
 * @typedef {Object} RouterStorage
 * @property {string} url Current page url
 * @property {string} name Current page name
 * @property {Object} params Current page params
 * @property {Class<Component>} activePageComponent Current page component class
 * @property {Object} activePageOptions Options for current page component
 * @property {boolean} pageLoaded Current page component loaded (@see Router.bindLazyPage)
 */

export const { storage, useStorage } = createStorage( {
    url: '',
    name: '',
    params: {},
    activePageComponent: null,
    activePageOptions: null,
    pageLoaded: true
}, {
    DI: 'router:storage',
    sync: true
} );
