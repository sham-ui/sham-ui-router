import { $ } from 'sham-ui-macro/ref.macro';
import { Component, insert, createChildContext } from 'sham-ui';
import { useStorage } from './storage';

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
function ActivePageContainer() {
    let lastRenderedURL = null;
    let lastRenderedComponent = null;

    const ctx = createChildContext(
        this,
        this.ctx.container
    );

    this.addSpots( [
        $.routerData,
        routerData => {
            const url = routerData.url;
            const activePageComponent = routerData.activePageComponent;
            if (
                url !== lastRenderedURL ||

                // Component can changed without change url
                activePageComponent !== lastRenderedComponent
            ) {

                // Remove self from parent's children map or child ref.
                if ( this.unbind ) {
                    this.unbind();
                }

                // Remove all nested views.
                let i = this.nested.length;
                while ( i-- ) {
                    this.nested[ i ].remove();
                }

                ctx.resetOwner();
            }
            if ( null === activePageComponent ) {
                return;
            }
            insert( ctx, activePageComponent, routerData.activePageOptions );
            lastRenderedURL = url;
            lastRenderedComponent = activePageComponent;
        }
    ] );
}

export default Component( useStorage( $.routerData ), ActivePageContainer );
