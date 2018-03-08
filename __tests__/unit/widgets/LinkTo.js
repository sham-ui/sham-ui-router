import { DI } from 'sham-ui';
import LinkTo from '../../../src/widgets/LinkTo';
import renderer from 'sham-ui-test-helpers';

afterEach( () => {
    DI.bind( 'router', null );
} );

it( 'render correctly', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer( LinkTo, {
        path: 'base',
        text: 'Base page'
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls.length ).toBe( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', {} ] );
} );

it( 'params options', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base/1' );

    const meta = renderer( LinkTo, {
        path: 'base',
        params: {
            id: 1
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls.length ).toBe( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', { id: 1 } ] );
} );

it( 'useActiveClass options', () => {
    const generateMock = jest.fn();
    const lastRouteResolvedMock = jest.fn();
    const registerActivePageLinkMock = jest.fn();
    const unregisterActivePageLink = jest.fn();

    DI.bind( 'router', {
        generate: generateMock,
        lastRouteResolved: lastRouteResolvedMock,
        _registerActivePageLink: registerActivePageLinkMock,
        _unregisterActivePageLink: unregisterActivePageLink
    } );

    generateMock.mockReturnValue( '/base' );
    lastRouteResolvedMock.mockReturnValue( { url: '/base' } );

    const meta = renderer( LinkTo, {
        path: 'base',
        useActiveClass: true
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls.length ).toBe( 1 );
    expect( generateMock.mock.calls[ 0 ] ).toEqual( [ 'base', {} ] );
    expect( lastRouteResolvedMock.mock.calls.length ).toBe( 1 );
    expect( registerActivePageLinkMock.mock.calls.length ).toBe( 1 );
    expect( registerActivePageLinkMock.mock.calls[ 0 ][ 0 ] ).toBe( meta.widget );

    DI.resolve( 'sham-ui' ).render.FORCE_ALL();
    expect( unregisterActivePageLink.mock.calls.length ).toBe( 1 );
    expect( unregisterActivePageLink.mock.calls[ 0 ][ 0 ] ).toBe( meta.widget );
} );

it( 'activeClass options', () => {
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

    const meta = renderer( LinkTo, {
        path: 'base',
        useActiveClass: true,
        activeClass: 'test-active'
    } );
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

    const meta = renderer( LinkTo, {
        path: 'base'
    } );
    meta.widget.querySelector( 'a' ).click();

    expect( meta.toJSON() ).toMatchSnapshot();
    expect( navigateMock.mock.calls.length ).toBe( 1 );
    expect( navigateMock.mock.calls[ 0 ] ).toEqual( [ '/base' ] );
} );

it( 'remove', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
        generate: generateMock
    } );

    generateMock.mockReturnValueOnce( '/base' );

    const meta = renderer( LinkTo, {
        path: 'base',
        text: 'Base page'
    } );
    meta.widget.remove();
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'destroy', () => {
    const generateMock = jest.fn();
    DI.bind( 'router', {
        generate: generateMock
    } );

    generateMock.mockReturnValue( '/base' );

    const meta = renderer( LinkTo, {
        path: 'base',
        text: 'Base page'
    } );

    DI.resolve( 'sham-ui' ).render.FORCE_ALL();

    meta.widget.remove();
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( generateMock.mock.calls.length ).toBe( 2 );
} );