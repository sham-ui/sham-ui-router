import { DI, inject, options } from 'sham-ui';
import LinkWidget from './Link.sht';

export default class extends LinkWidget {
    @inject router = 'router';

    @options
    get text() {
        return '';
    }

    @options
    get defaultUrl() {
        return '/';
    }

    @options
    get params() {
        return {}
    }

    generateURL( path, params ) {
        return this.router.generate( path, params );
    }

    get aNode() {
        return this.querySelector( 'a' );
    }

    bindEvents() {
        this.aNode.addEventListener(
            'click',
            this._click.bind( this )
        )
    }

    destroy() {
        this.aNode.removeEventListener( 'click' );
    }

    _click( e ) {
        e.preventDefault();
        this.router.navigate( this.aNode.getAttribute( 'href' ) );
    }
}