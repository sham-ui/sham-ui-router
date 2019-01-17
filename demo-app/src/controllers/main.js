import App from '../widgets/App.sht';
import FooPage from '../widgets/FooPage.sht';
import BarPage from '../widgets/BarPage.sht';
import Router from '../../../src';

export default function() {
    const router = new Router();
    router
        .bindPage( '/foo', 'foo', FooPage, {} )
        .bindPage( '/bar', 'bar', BarPage, {} )
        .bindPage( '/', 'root', FooPage, {} );

    new App( {
        ID: 'app',
        containerSelector: 'body'
    } );
}
