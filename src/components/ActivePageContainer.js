import { Component } from 'sham-ui';
import { useStorage } from '../storage';

/**
 * Options for LinkTo
 * @typedef {Object} LinkToOptions
 * @property {string} path Name of page for link. Default ''
 * @property {Object} params Params of page for link. Default {}
 * @property {string} text Text for link. Default ''
 * @property {boolean} useActiveClass Use activeClass options for active page link. Default false
 * @property {string} activeClass Class name for active link. Default 'active'
 */

/**
 * Component for link to page
 * @class LinkTo
 * @classdesc
 * @property {LinkToOptions} options
 */

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
        this.lastRenderedComponent = null;
        this.ref = null;
    }

    updateSpots() {
        const url = this.options.routerData.url;
        const activePageComponent = this.options.routerData.activePageComponent;
        if (
            null !== this.lastRendererdURL &&
            (
                url !== this.lastRendererdURL ||

                // Component can changed without change url
                activePageComponent !== this.lastRenderedComponent
            )
        ) {
            this._clearContainer();
        }
        if ( null === activePageComponent ) {
            return;
        }
        window.__UI__.insert(
            this,
            this.container,
            this,
            activePageComponent,
            this.options.routerData.activePageOptions,
            this.owner,
            this.blocks
        );
        this.lastRendererdURL = url;
        this.lastRenderedComponent = activePageComponent;
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
