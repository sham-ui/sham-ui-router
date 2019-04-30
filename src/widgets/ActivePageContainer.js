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
            this._clearContainer();
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

    _clearContainer() {

        // Remove self from parent's children map or child ref.
        if ( this.unbind ) {
            this.unbind();
        }

        // Remove all nested views.
        let i = this.nested.length;
        while ( i-- ) {
            this.UI.render.unregister( this.nested[ i ].ID );
        }
    }
}
