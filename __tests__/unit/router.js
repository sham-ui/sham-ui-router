import Router from '../../src/router';
import { DI } from 'sham-ui';

it( 'DI registry', () => {
    const router = new Router();
    expect( DI.resolve( 'router' ) ).toBeInstanceOf( Router );
} );
