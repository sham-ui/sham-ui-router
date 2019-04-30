import { inject, Widget, options } from 'sham-ui';
import { ACTIVE_PAGE_CONTAINER_TYPE } from '../settings';

export default class ActivePageContainer extends Widget {
    constructor() {
        super( ...arguments );
        this.lastRendererdURL = null;
        this.ref = null;
    }

    /** @type Router */
    @inject router;

    @options types = [ ACTIVE_PAGE_CONTAINER_TYPE ];

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
