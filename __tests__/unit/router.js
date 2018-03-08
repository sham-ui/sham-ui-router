import Router from '../../src/router';
import Navigo from 'navigo';
import { DI } from 'sham-ui';
import DummyWidget from './widgets/Dummy.sht';
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

it( 'params', () => {
    const onMock = jest.fn();
    DI.bind( 'sham-ui', {
        render: {
            on: onMock
        }
    } );
    new Router( null, false, '#', false );
    expect( Navigo ).toHaveBeenCalledTimes( 1 );
    expect( onMock.mock.calls.length ).toBe( 0 );
} );

it( 'DI registry', () => {
    const router = new Router();
    expect( DI.resolve( 'router' ) ).toBeInstanceOf( Router );
} );

it( 'resolve', () => {
    const resolveMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            resolve: resolveMock
        };
    } );

    const router = new Router();
    router.resolve();

    expect( resolveMock.mock.calls.length ).toBe( 1 );
    expect( resolveMock.mock.calls[ 0 ] ).toEqual( [] );
} );


it( 'on', () => {
    const onMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            on: onMock
        };
    } );

    const router = new Router();
    router.on();

    expect( onMock.mock.calls.length ).toBe( 1 );
    expect( onMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'off', () => {
    const offMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            off: offMock
        };
    } );

    const router = new Router();
    router.off();

    expect( offMock.mock.calls.length ).toBe( 1 );
    expect( offMock.mock.calls[ 0 ] ).toEqual( [] );
} );


it( 'notFound', () => {
    const notFoundMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            notFound: notFoundMock
        };
    } );

    const router = new Router();
    router.notFound();

    expect( notFoundMock.mock.calls.length ).toBe( 1 );
    expect( notFoundMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'navigate', () => {
    const navigateMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            navigate: navigateMock
        };
    } );

    const router = new Router();
    router.navigate();

    expect( navigateMock.mock.calls.length ).toBe( 1 );
    expect( navigateMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'hooks', () => {
    const hooksMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            hooks: hooksMock
        };
    } );

    const router = new Router();
    router.hooks();

    expect( hooksMock.mock.calls.length ).toBe( 1 );
    expect( hooksMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'destroy', () => {
    const destroyMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            destroy: destroyMock
        };
    } );

    const router = new Router();
    router.destroy();

    expect( destroyMock.mock.calls.length ).toBe( 1 );
    expect( destroyMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'link', () => {
    const linkMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            link: linkMock
        };
    } );

    const router = new Router();
    router.link();

    expect( linkMock.mock.calls.length ).toBe( 1 );
    expect( linkMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'lastRouteResolved', () => {
    const lastRouteResolvedMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            lastRouteResolved: lastRouteResolvedMock
        };
    } );

    const router = new Router();
    router.lastRouteResolved();

    expect( lastRouteResolvedMock.mock.calls.length ).toBe( 1 );
    expect( lastRouteResolvedMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'generate', () => {
    const generateMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            generate: generateMock
        };
    } );

    const router = new Router();
    router.generate();

    expect( generateMock.mock.calls.length ).toBe( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'bindPage', () => {
    const onMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            on: onMock,
            resolve: () => {
                onMock.mock.calls[ 0 ][ 1 ].uses();
            }
        }
    } );
    const renderOnlyMock = jest.fn();
    DI.bind( 'sham-ui', {
        render: {
            on: jest.fn(),
            ONLY: renderOnlyMock
        }
    } );
    DI.bind( 'widgets:active-page-container', { ID: 'test' } );

    const router = new Router();
    expect( router.activePageWidget ).toEqual( null );
    expect( router.activePageOptions ).toEqual( null );
    expect( router.activePageLinks.size ).toEqual( 0 );

    router.bindPage( '/', 'root', DummyWidget, { foo: 1 } );

    expect( onMock.mock.calls.length ).toBe( 1 );
    expect( onMock.mock.calls[ 0 ][ 0 ] ).toBe( '/' );
    expect( Object.keys( onMock.mock.calls[ 0 ][ 1 ] ).sort() ).toEqual( [ 'as', 'uses' ] );
    expect( onMock.mock.calls[ 0 ][ 1 ].as ).toBe( 'root' );

    const activePageLink = {
        update: jest.fn()
    };
    router._registerActivePageLink( activePageLink );
    expect( router.activePageLinks.size ).toBe( 1 );
    expect( Array.from( router.activePageLinks.values() ) ).toEqual( [ activePageLink ] );

    router.resolve();

    expect( router.activePageWidget ).toEqual( DummyWidget );
    expect( router.activePageOptions ).toEqual( { foo: 1 } );
    expect( renderOnlyMock.mock.calls.length ).toBe( 1 );
    expect( renderOnlyMock.mock.calls[ 0 ] ).toEqual( [ 'test' ] );
    expect( activePageLink.update.mock.calls.length ).toBe( 1 );
    expect( activePageLink.update.mock.calls[ 0 ].length ).toBe( 0 );

    router._unregisterActivePageLink( activePageLink );
    expect( router.activePageLinks.size ).toBe( 0 );
} );


it( 'safe _renderActivatePage', () => {
    DI.bind( 'widgets:active-page-container', undefined );
    const router = new Router();
    router._renderActivatePage();
} );