import { createDI } from 'sham-ui';
import { storage } from '../../../src/storage';
import LinkTo from '../../../src/components/LinkTo.sfc';
import hrefto from '../../../src/directives/href-to';
import renderer from 'sham-ui-test-helpers';

const DI = createDI();

afterEach( () => {
    DI.bind( 'router', null );
    DI.resolve( 'router:storage' ).reset();
} );

it( 'render correctly', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
        storage: storage( DI ),
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer( LinkTo, {
        DI,
        path: 'base',
        text: 'Base page',
        directives: {
            'hrefto': hrefto
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls ).toHaveLength( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', {} ] );
} );

it( 'params options', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
        storage: storage( DI ),
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base/1' );

    const meta = renderer( LinkTo, {
        DI,
        path: 'base',
        params: {
            id: 1
        },
        directives: {
            'hrefto': hrefto
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls ).toHaveLength( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', { id: 1 } ] );
} );

it( 'useActiveClass options', () => {
    const generateMock = jest.fn();

    const routerStorage = storage( DI );

    DI.bind( 'router', {
        storage: routerStorage,
        generate: generateMock
    } );

    generateMock.mockReturnValue( '/base' );
    routerStorage.url = '/base';
    routerStorage.sync();

    const meta = renderer( LinkTo, {
        DI,
        path: 'base',
        useActiveClass: true,
        directives: {
            'hrefto': hrefto
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls ).toHaveLength( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', {} ] );
} );

it( 'activeClass options', () => {
    const generateMock = jest.fn();

    const routerStorage = storage( DI );

    DI.bind( 'router', {
        storage: routerStorage,
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );
    routerStorage.url = '/base';
    routerStorage.sync();

    const meta = renderer( LinkTo, {
        DI,
        path: 'base',
        useActiveClass: true,
        activeClass: 'test-active',
        directives: {
            'hrefto': hrefto
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'className option', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
        storage: storage( DI ),
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer( LinkTo, {
        DI,
        path: 'base',
        text: 'Base page',
        className: 'foo bar',
        directives: {
            'hrefto': hrefto
        }
    } );
    expect( meta.component.container.querySelector( 'a' ).className ).toEqual( 'foo bar' );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'className option & useActiveClass & activeClass', () => {
    const generateMock = jest.fn();

    const routerStorage = storage( DI );
    DI.bind( 'router', {
        storage: routerStorage,
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );
    routerStorage.url = '/base';
    routerStorage.sync();

    const meta = renderer( LinkTo, {
        DI,
        path: 'base',
        useActiveClass: true,
        activeClass: 'test-active',
        className: 'foo',
        directives: {
            'hrefto': hrefto
        }
    } );
    expect( meta.component.container.querySelector( 'a' ).className ).toEqual( 'foo test-active' );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'click', () => {
    const generateMock = jest.fn();
    const navigateMock = jest.fn();

    DI.bind( 'router', {
        storage: storage( DI ),
        generate: generateMock,
        navigate: navigateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer( LinkTo, {
        DI,
        path: 'base',
        directives: {
            'hrefto': hrefto
        }
    } );
    meta.component.container.querySelector( 'a' ).click();

    expect( meta.toJSON() ).toMatchSnapshot();
    expect( navigateMock.mock.calls ).toHaveLength( 1 );
    expect( navigateMock.mock.calls[ 0 ] ).toEqual( [ '/base' ] );
} );

it( 'remove', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
        storage: storage( DI ),
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer( LinkTo, {
        DI,
        path: 'base',
        text: 'Base page',
        directives: {
            'hrefto': hrefto
        }
    } );
    const container = meta.component.container;
    meta.component.remove();
    expect( container.innerHTML ).toEqual( '' );
} );
