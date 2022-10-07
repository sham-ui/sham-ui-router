import { createDI } from 'sham-ui';
import { storage } from '../../../src/storage';
import LinkTo from '../../../src/components/LinkTo.sfc';
import hrefto from '../../../src/directives/href-to';
import renderer from 'sham-ui-test-helpers';

it( 'render correctly', () => {
    const DI = createDI();

    const generateMock = jest.fn();
    DI.bind( 'router', {
        storage: storage( DI ),
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer( LinkTo, {
        path: 'base',
        text: 'Base page'
    }, {
        DI,
        directives: {
            'hrefto': hrefto
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls ).toHaveLength( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', {} ] );
} );

it( 'params options', () => {
    const DI = createDI();

    const generateMock = jest.fn();
    DI.bind( 'router', {
        storage: storage( DI ),
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base/1' );

    const meta = renderer( LinkTo, {
        path: 'base',
        params: {
            id: 1
        }
    }, {
        DI,
        directives: {
            'hrefto': hrefto
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls ).toHaveLength( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', { id: 1 } ] );
} );

it( 'useActiveClass options', () => {
    const DI = createDI();

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
        path: 'base',
        useActiveClass: true
    }, {
        DI,
        directives: {
            'hrefto': hrefto
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls ).toHaveLength( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', {} ] );
} );

it( 'activeClass options', () => {
    const DI = createDI();

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
        path: 'base',
        useActiveClass: true,
        activeClass: 'test-active'
    }, {
        DI,
        directives: {
            'hrefto': hrefto
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'className option', () => {
    const DI = createDI();

    const generateMock = jest.fn();
    DI.bind( 'router', {
        storage: storage( DI ),
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer( LinkTo, {
        path: 'base',
        text: 'Base page',
        className: 'foo bar'
    }, {
        DI,
        directives: {
            'hrefto': hrefto
        }
    } );
    expect( meta.ctx.container.querySelector( 'a' ).className ).toEqual( 'foo bar' );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'className option & useActiveClass & activeClass', () => {
    const DI = createDI();

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
        path: 'base',
        useActiveClass: true,
        activeClass: 'test-active',
        className: 'foo'
    }, {
        DI,
        directives: {
            'hrefto': hrefto
        }
    } );
    expect(
        meta.ctx.container.querySelector( 'a' ).className
    ).toEqual( 'foo test-active' );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'click', () => {
    const DI = createDI();

    const generateMock = jest.fn();
    const navigateMock = jest.fn();

    DI.bind( 'router', {
        storage: storage( DI ),
        generate: generateMock,
        navigate: navigateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer( LinkTo, {
        path: 'base'
    }, {
        DI,
        directives: {
            'hrefto': hrefto
        }
    } );
    meta.ctx.container.querySelector( 'a' ).click();

    expect( meta.toJSON() ).toMatchSnapshot();
    expect( navigateMock.mock.calls ).toHaveLength( 1 );
    expect( navigateMock.mock.calls[ 0 ] ).toEqual( [ '/base' ] );
} );

it( 'remove', () => {
    const DI = createDI();

    const generateMock = jest.fn();
    DI.bind( 'router', {
        storage: storage( DI ),
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer( LinkTo, {
        path: 'base',
        text: 'Base page'
    }, {
        DI,
        directives: {
            'hrefto': hrefto
        }
    } );
    meta.component.remove();
    expect( meta.ctx.container.innerHTML ).toEqual( '' );
} );
