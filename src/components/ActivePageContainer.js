import { Component } from 'sham-ui';
import { useStorage } from '../storage';

/**
 * Component-container for page
 * @example
 * {% import ActivePageContainer from 'sham-ui-router/active-page-container' %}
 * ...
 * <ActivePageContainer/>
 * ...
 */
class ActivePageContainer extends Component {
    constructor() {
        super( ...arguments );
        this.lastRendererdURL = null;
        this.ref = null;
    }

    updateSpots() {
        const url = this.options.routerData.url;
        if ( null !== this.lastRendererdURL && url !== this.lastRendererdURL ) {
            this._clearContainer();
        }
        window.__UI__.insert(
            this,
            this.container,
            this,
            this.options.routerData.activePageComponent,
            this.options.routerData.activePageOptions,
            this.owner,
            this.blocks
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
            this.nested[ i ].remove();
        }
    }
}

export default useStorage( 'routerData' )( ActivePageContainer );
