import { inject, Widget } from 'sham-ui';
import { ACTIVE_PAGE_CONTAINER_ID } from '../settings';

export default class ActivePageContainer extends Widget {
    constructor( options ) {
        super( {
            ...options,
            ID: ACTIVE_PAGE_CONTAINER_ID
        } );
        this.lastRendererdURL = null;
        this.ref = null;
    }

    /** @type Router */
    @inject router;

    render() {
        super.render( ...arguments );
        const { router } = this;
        const url = router.lastRouteResolved().url;
        if ( null !== this.lastRendererdURL && url !== this.lastRendererdURL ) {
            this.remove();
        }
        window.__UI__.insert(
            this,
            this.container,
            this,
            router.activePageWidget,
            router.activePageOptions,
            this.owner
        );
        this.lastRendererdURL = url;
    }

    update( data ) {
        this.__data__ = Object.assign( {}, this.options, data );
        if ( data ) {
            Object.defineProperties(
                this.options,
                Object.getOwnPropertyDescriptors( data )
            );
        }
        delete this.__data__;
    }
}
