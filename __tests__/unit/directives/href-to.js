import { DI } from 'sham-ui';
import { storage } from '../../../src/storage';
import HrefTo from '../../../src/directives/href-to';
import path from '../../../src/builders/params';
import renderer, { compile } from 'sham-ui-test-helpers';

afterEach( () => {
    DI.resolve( 'router:storage' ).reset();
} );

it( 'render correctly', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
        storage,
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer(
        compile`
            <a :hrefto={{ {'path': 'base'} }}>
                Base page
            </a>
        
        `,
        {
            directives: {
                'hrefto': HrefTo
            }
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls ).toHaveLength( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', {} ] );
} );

it( 'params', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
        storage,
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base/1' );

    const meta = renderer(
        compile`
            <a :hrefto={{ { 'path': 'base', 'params': {'id': 1} } }}>
                Base page
            </a>
        `,
        {
            directives: {
                'hrefto': HrefTo
            }
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls ).toHaveLength( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', { id: 1 } ] );
} );

it( 'params from options', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
        storage,
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base/1' );

    const meta = renderer(
        compile`
            <a :hrefto={{ { 'path': 'base', 'params': params } }}>
                Base page
            </a>
        `,
        {
            directives: {
                'hrefto': HrefTo
            },
            params: {
                id: 1
            }
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls ).toHaveLength( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', { id: 1 } ] );
} );

it( 'useActiveClass', () => {
    const generateMock = jest.fn();

    DI.bind( 'router', {
        storage,
        generate: generateMock
    } );

    generateMock.mockReturnValue( '/base' );
    storage.url = '/base';
    storage.sync();

    const meta = renderer(
        compile`
            <a :hrefto={{ {'path': 'base', 'useActiveClass': true} }}>
                Base page
            </a>
        `,
        {
            directives: {
                'hrefto': HrefTo
            }
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls ).toHaveLength( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', {} ] );
    expect( meta.component.container.querySelector( 'a' ).className ).toEqual( 'active' );

    storage.url = '/baz';
    storage.sync();
    expect( meta.component.container.querySelector( 'a' ).className ).toEqual( '' );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'activeClass', () => {
    const generateMock = jest.fn();

    DI.bind( 'router', {
        storage,
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );
    storage.url = '/base';
    storage.sync();

    const meta = renderer(
        compile`
            <a :hrefto={{ {'path': 'base', 'useActiveClass': true, 'activeClass': 'test-active'} }}>
                Base page
            </a>
        `,
        {
            directives: {
                'hrefto': HrefTo
            }
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'class & useActiveClass & activeClass', () => {
    const generateMock = jest.fn();

    DI.bind( 'router', {
        storage,
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );
    storage.url = '/base';
    storage.sync();

    const meta = renderer(
        compile`
            <a 
                :hrefto={{ {'path': 'base', 'useActiveClass': true, 'activeClass': 'test-active'} }}
                class="foo"
            >
                Base page
            </a>
        `,
        {
            directives: {
                'hrefto': HrefTo
            }
        }
    );
    expect( meta.component.container.querySelector( 'a' ).className ).toEqual( 'foo test-active' );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'click', () => {
    const generateMock = jest.fn();
    const navigateMock = jest.fn();

    DI.bind( 'router', {
        storage,
        generate: generateMock,
        navigate: navigateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer(
        compile`
            <a :hrefto={{ {'path': 'base'} }}>
                Base page
            </a>
        
        `,
        {
            directives: {
                'hrefto': HrefTo
            }
        }
    );
    meta.component.container.querySelector( 'a' ).click();

    expect( meta.toJSON() ).toMatchSnapshot();
    expect( navigateMock.mock.calls ).toHaveLength( 1 );
    expect( navigateMock.mock.calls[ 0 ] ).toEqual( [ '/base' ] );
} );

it( 'remove', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
        storage,
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer(
        compile`
            <a :hrefto={{ {'path': 'base'} }}>
                Base page
            </a>
        
        `,
        {
            directives: {
                'hrefto': HrefTo
            }
        }
    );
    meta.component.remove();
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'params builder', () => {
    const generateMock = jest.fn();

    DI.bind( 'router', {
        storage,
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base/1' );
    storage.url = '/base/1';
    storage.sync();

    const meta = renderer(
        compile`
            <a 
                :hrefto={{ path( 'base' ).param( 'id', 1 )._useActiveClass()._activeClass( 'test-active' ) }}
                class="foo"
            >
                Base page
            </a>
        `,
        {
            directives: {
                'hrefto': HrefTo
            },
            path
        }
    );
    expect( meta.component.container.querySelector( 'a' ).className ).toBe( 'foo test-active' );
    expect( meta.component.container.querySelector( 'a' ).href ).toBe(
        'http://sham-ui-router.example.com/base/1'
    );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', { id: 1 } ] );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
