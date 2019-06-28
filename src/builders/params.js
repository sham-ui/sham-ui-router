export default function( path ) {
    return Object.defineProperties( {
        path,
        params: {}
    }, {
        param: {
            value: function( name, value ) {
                this.params[ name ] = value;
                return this;
            }
        },
        _params: {
            value: function( value ) {
                this.params = value;
                return this;
            }
        },
        _useActiveClass: {
            value: function() {
                this.useActiveClass = true;
                return this;
            }
        },
        _activeClass: {
            value: function( activeClass ) {
                this.activeClass = activeClass;
                return this;
            }
        }
    } );
}
