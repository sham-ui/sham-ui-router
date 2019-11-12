import { DI } from 'sham-ui';
import { storage } from '../../../src/storage';
import ActivePageContainer from '../../../src/components/ActivePageContainer';
import DummyComponent from './Dummy.sht';
import DynamicPlaceActivePageContainer from './DynamicPlaceActivePageContainer.sht';
import renderer from 'sham-ui-test-helpers';

afterEach( () => {
    DI.resolve( 'router:storage' ).reset();
} );

it( 'renders correctly', () => {
    const generateMock = jest.fn();

    DI.bind( 'router', {
        storage,
        generate: generateMock
    } );
    storage.activePageComponent = DummyComponent;
    storage.activePageOptions = {
        path: 'base',
        text: 'Base page'
    };
    storage.sync();

    generateMock.mockReturnValue( '/base' );

    const meta = renderer( ActivePageContainer, {} );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'correct process dynamic placet', () => {
    const generateMock = jest.fn();

    DI.bind( 'router', {
        storage,
        generate: generateMock
    } );
    storage.activePageComponent = DummyComponent;
    storage.activePageOptions = {
        path: 'base',
        text: 'Base page'
    };
    storage.sync();

    generateMock.mockReturnValue( '/base' );

    const meta = renderer( DynamicPlaceActivePageContainer, {
        withWrapper: false
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    meta.component.update( {
        withWrapper: true
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
