import { DI } from 'sham-ui';
import HrefTo from '../../../src/directives/href-to';
import path from '../../../src/builders/params';
import renderer, { compile } from 'sham-ui-test-helpers';

it( 'render correctly', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
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
    const lastRouteResolvedMock = jest.fn();

    DI.bind( 'router', {
        generate: generateMock,
        lastRouteResolved: lastRouteResolvedMock
    } );

    generateMock.mockReturnValue( '/base' );
    lastRouteResolvedMock.mockReturnValue( { url: '/base' } );

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
    expect( lastRouteResolvedMock.mock.calls ).toHaveLength( 1 );
    expect( meta.component.querySelector( 'a' ).className ).toEqual( 'active' );

    lastRouteResolvedMock.mockReturnValue( { url: '/baz' } );
    DI.resolve( 'sham-ui' ).render.emit( 'RouteChanged' );
    expect( meta.component.querySelector( 'a' ).className ).toEqual( '' );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'activeClass', () => {
    const generateMock = jest.fn();
    const lastRouteResolvedMock = jest.fn();
    const registerActivePageLinkMock = jest.fn();

    DI.bind( 'router', {
        generate: generateMock,
        lastRouteResolved: lastRouteResolvedMock,
        _registerActivePageLink: registerActivePageLinkMock
    } );

    generateMock.mockReturnValueOnce( '/base' );
    lastRouteResolvedMock.mockReturnValueOnce( { url: '/base' } );

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
    const lastRouteResolvedMock = jest.fn();
    const registerActivePageLinkMock = jest.fn();

    DI.bind( 'router', {
        generate: generateMock,
        lastRouteResolved: lastRouteResolvedMock,
        _registerActivePageLink: registerActivePageLinkMock
    } );

    generateMock.mockReturnValueOnce( '/base' );
    lastRouteResolvedMock.mockReturnValueOnce( { url: '/base' } );

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
    expect( meta.component.querySelector( 'a' ).className ).toEqual( 'foo test-active' );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'click', () => {
    const generateMock = jest.fn();
    const navigateMock = jest.fn();

    DI.bind( 'router', {
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
    meta.component.querySelector( 'a' ).click();

    expect( meta.toJSON() ).toMatchSnapshot();
    expect( navigateMock.mock.calls ).toHaveLength( 1 );
    expect( navigateMock.mock.calls[ 0 ] ).toEqual( [ '/base' ] );
} );

it( 'remove', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
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

it( 'destroy', () => {
    const generateMock = jest.fn();
    const lastRouteResolvedMock = jest.fn();
    DI.bind( 'router', {
        generate: generateMock,
        lastRouteResolved: lastRouteResolvedMock
    } );

    generateMock.mockReturnValue( '/base' );
    lastRouteResolvedMock.mockReturnValue( { url: '/base' } );

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

    DI.resolve( 'sham-ui' ).render.ALL();

    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls ).toHaveLength( 2 );
} );

it( 'params builder', () => {
    const generateMock = jest.fn();
    const lastRouteResolvedMock = jest.fn();
    const registerActivePageLinkMock = jest.fn();

    DI.bind( 'router', {
        generate: generateMock,
        lastRouteResolved: lastRouteResolvedMock,
        _registerActivePageLink: registerActivePageLinkMock
    } );

    generateMock.mockReturnValueOnce( '/base/1' );
    lastRouteResolvedMock.mockReturnValueOnce( { url: '/base/1' } );

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
    expect( meta.component.querySelector( 'a' ).className ).toBe( 'foo test-active' );
    expect( meta.component.querySelector( 'a' ).href ).toBe(
        'http://sham-ui-router.example.com/base/1'
    );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', { id: 1 } ] );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
