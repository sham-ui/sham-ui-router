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
