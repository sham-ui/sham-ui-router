const crypto = require( 'crypto' );

Object.defineProperty( global.self, 'crypto', {
    value: {
        getRandomValues: arr => crypto.randomBytes( arr.length )
    }
} );

global.ACTIVE_PAGE_CONTAINER_TYPE = 'active-page-container';
global.ACTIVE_PAGE_LINK_TYPE = 'link-to-active-page';
