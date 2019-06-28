import path from '../../../src/builders/params';

it( 'path', () => {
    expect( path( 'base' ) ).toEqual( { path: 'base', params: {} } );
} );

it( 'param', () => {
    expect( path( 'base' ).param( 'id', 1 ) ).toEqual( { path: 'base', params: { id: 1 } } );
} );

it( '_params', () => {
    expect( path( 'base' )._params( { 'id': 2 } ) ).toEqual( { path: 'base', params: { id: 2 } } );
} );

it( '_useActiveClass', () => {
    expect( path( 'base' )._useActiveClass() ).toEqual( {
        path: 'base',
        params: {},
        useActiveClass: true
    } );
} );

it( 'activeClass', () => {
    expect( path( 'base' )._useActiveClass()._activeClass( 'test-active' ) ).toEqual( {
        path: 'base',
        params: {},
        useActiveClass: true,
        activeClass: 'test-active'
    } );
} );
