import Router from '../../src/router';
import Navigo from 'navigo';
import { DI } from 'sham-ui';
jest.mock( 'navigo' );

beforeEach( () => {
    Navigo.mockClear();
    DI.bind( 'sham-ui', {
        render: {
            on: jest.fn()
        }
    } );
} );

afterEach( () => {
    DI.bind( 'sham-ui', null );
} );

it( 'use Navigo', () => {
    const router = new Router();
    expect( Navigo ).toHaveBeenCalledTimes( 1 );
} );

it( 'DI registry', () => {
    const router = new Router();
    expect( DI.resolve( 'router' ) ).toBeInstanceOf( Router );
} );
