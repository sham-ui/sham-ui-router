import App from '../components/App.sht';
import FooPage from '../components/FooPage.sht';
import BarPage from '../components/BarPage.sht';
import hrefto from '../../../src/directives/href-to';
import Router from '../../../src';

export default function() {
    const router = new Router();
    router
        .bindPage( '/foo', 'foo', FooPage, {} )
        .bindPage( '/bar', 'bar', BarPage, {} )
        .bindPage( '/', 'root', FooPage, {} )
        .resolve();

    new App( {
        ID: 'app',
        container: document.querySelector( 'body' ),
        directives: {
            hrefto
        }
    } );
}
