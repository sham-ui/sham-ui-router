import { inject, Component, options } from 'sham-ui';

export default class ActivePageContainer extends Component {
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
            router.activePageComponent,
            router.activePageOptions,
            this.owner
        );
        this.lastRendererdURL = url;
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
