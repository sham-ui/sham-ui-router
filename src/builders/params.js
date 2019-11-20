/**
 * Helper for build params for href-to directive
 * @typedef {Object} ParamsBuilder
 */

/**
 * Create new ParamsBuilder
 * @param {string} path Name of destination page
 * @return {ParamsBuilder}
 */
export default function path( path ) {
    return Object.defineProperties( {
        path,
        params: {}
    }, {

        /**
         * Add param for page
         * @name param
         * @method
         * @memberof ParamsBuilder
         * @param {string} name Param name
         * @param {*} value Param value
         * @return {ParamsBuilder}
         */
        param: {
            value: function( name, value ) {
                this.params[ name ] = value;
                return this;
            }
        },

        /**
         * Set params
         * @name _params
         * @method
         * @memberof ParamsBuilder
         * @param {Object} value
         * @return {ParamsBuilder}
         */
        _params: {
            value: function( value ) {
                this.params = value;
                return this;
            }
        },

        /**
         * User active class
         * @name _useActiveClass
         * @method
         * @memberof ParamsBuilder
         * @return {ParamsBuilder}
         */
        _useActiveClass: {
            value: function() {
                this.useActiveClass = true;
                return this;
            }
        },

        /**
         * Set active class
         * @name _activeClass
         * @method
         * @memberof ParamsBuilder
         * @param {string} activeClass
         * @return {ParamsBuilder}
         */
        _activeClass: {
            value: function( activeClass ) {
                this.activeClass = activeClass;
                return this;
            }
        }
    } );
}
