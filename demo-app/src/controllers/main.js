import { DI } from 'sham-ui';
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

    const app = new App( 'body', 'app', {

    } );

    DI.bind( 'widgets:app', app );
}
