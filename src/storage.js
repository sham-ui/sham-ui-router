import createStorage from 'sham-ui-data-storage';
export const { storage, useStorage } = createStorage( {
    url: '',
    activePageComponent: null,
    activePageOptions: null
}, { DI: 'router:storage' } );
