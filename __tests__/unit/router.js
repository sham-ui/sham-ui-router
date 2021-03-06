import Router from '../../src/index';
import Navigo from 'navigo';
import { createDI } from 'sham-ui';
import { compile } from 'sham-ui-test-helpers';
jest.mock( 'navigo' );

const DI = createDI();

beforeEach( () => {
    Navigo.mockClear();
} );

afterEach( () => {
    DI.resolve( 'router:storage' ).reset();
} );

it( 'use Navigo', () => {
    new Router( DI );
    expect( Navigo ).toHaveBeenCalledTimes( 1 );
} );

it( 'params', () => {
    new Router( DI, null, '#', false );
    expect( Navigo ).toHaveBeenCalledTimes( 1 );
} );

it( 'DI registry', () => {
    new Router( DI );
    expect( DI.resolve( 'router' ) ).toBeInstanceOf( Router );
} );

it( 'resolve', () => {
    const resolveMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            resolve: resolveMock
        };
    } );

    const router = new Router( DI );
    router.resolve();

    expect( resolveMock.mock.calls ).toHaveLength( 1 );
    expect( resolveMock.mock.calls[ 0 ] ).toEqual( [] );
} );


it( 'on', () => {
    const onMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            on: onMock
        };
    } );

    const router = new Router( DI );
    router.on();

    expect( onMock.mock.calls ).toHaveLength( 1 );
    expect( onMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'off', () => {
    const offMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            off: offMock
        };
    } );

    const router = new Router( DI );
    router.off();

    expect( offMock.mock.calls ).toHaveLength( 1 );
    expect( offMock.mock.calls[ 0 ] ).toEqual( [] );
} );


it( 'notFound', () => {
    const notFoundMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            notFound: notFoundMock
        };
    } );

    const router = new Router( DI );
    router.notFound();

    expect( notFoundMock.mock.calls ).toHaveLength( 1 );
    expect( notFoundMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'navigate', () => {
    const navigateMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            navigate: navigateMock
        };
    } );

    const router = new Router( DI );
    router.navigate();

    expect( navigateMock.mock.calls ).toHaveLength( 1 );
    expect( navigateMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'hooks', () => {
    const hooksMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            hooks: hooksMock
        };
    } );

    const router = new Router( DI );
    router.hooks();

    expect( hooksMock.mock.calls ).toHaveLength( 1 );
    expect( hooksMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'destroy', () => {
    const destroyMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            destroy: destroyMock
        };
    } );

    const router = new Router( DI );
    router.destroy();

    expect( destroyMock.mock.calls ).toHaveLength( 1 );
    expect( destroyMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'link', () => {
    const linkMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            link: linkMock
        };
    } );

    const router = new Router( DI );
    router.link();

    expect( linkMock.mock.calls ).toHaveLength( 1 );
    expect( linkMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'generate', () => {
    const generateMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            generate: generateMock
        };
    } );

    const router = new Router( DI );
    router.generate();

    expect( generateMock.mock.calls ).toHaveLength( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [] );
} );

it( 'bindPage', () => {
    const onMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            on: onMock,
            resolve() {
                onMock.mock.calls[ 0 ][ 1 ].uses();
            },
            lastRouteResolved() {
                return {};
            }
        };
    } );

    const router = new Router( DI );
    expect( router.storage.activePageComponent ).toEqual( null );
    expect( router.storage.activePageOptions ).toEqual( null );

    const DummyComponent = compile`
        <h1>Title</h1>
        <div>Content for dummy component</div>
    `;

    router.bindPage( '/', 'root', DummyComponent, { foo: 1 } );

    expect( onMock.mock.calls ).toHaveLength( 1 );
    expect( onMock.mock.calls[ 0 ][ 0 ] ).toBe( '/' );
    expect( Object.keys( onMock.mock.calls[ 0 ][ 1 ] ).sort() ).toEqual( [ 'as', 'foo', 'uses' ] );
    expect( onMock.mock.calls[ 0 ][ 1 ].as ).toBe( 'root' );

    router.resolve();

    expect( router.storage.activePageComponent ).toEqual( DummyComponent );
    expect( router.storage.activePageOptions ).toEqual( { foo: 1 } );
} );


it( 'bindLazyPage', async() => {
    expect.assertions( 8 );

    const onMock = jest.fn();
    Navigo.mockImplementation( () => {
        return {
            on: onMock,
            resolve() {
                onMock.mock.calls[ 0 ][ 1 ].uses();
            },
            lastRouteResolved() {
                return {};
            }
        };
    } );

    const router = new Router( DI );
    expect( router.storage.activePageComponent ).toEqual( null );
    expect( router.storage.activePageOptions ).toEqual( null );

    const DummyComponent = compile`
        <h1>Title</h1>
        <div>Content for dummy component</div>
    `;

    const loader = new Promise( resolve => {
        resolve( {
            default: DummyComponent
        } );
    } );

    router.bindLazyPage( '/', 'root', () => loader, { foo: 1 } );

    expect( onMock.mock.calls ).toHaveLength( 1 );
    expect( onMock.mock.calls[ 0 ][ 0 ] ).toBe( '/' );
    expect( Object.keys( onMock.mock.calls[ 0 ][ 1 ] ).sort() ).toEqual( [ 'as', 'foo', 'uses' ] );
    expect( onMock.mock.calls[ 0 ][ 1 ].as ).toBe( 'root' );

    router.resolve();

    await loader.then();

    expect( router.storage.activePageComponent ).toEqual( DummyComponent );
    expect( router.storage.activePageOptions ).toEqual( { foo: 1 } );
} );
