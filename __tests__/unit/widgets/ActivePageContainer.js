import { DI } from 'sham-ui';
import ActivePageContainer from '../../../src/widgets/ActivePageContainer';
import DummyWidget from './Dummy.sht';
import DynamicPlaceActivePageContainer from './DynamicPlaceActivePageContainer.sht';
import renderer from 'sham-ui-test-helpers';


it( 'renders correctly', () => {
    const generateMock = jest.fn();
    const lastRouteResolvedMock = jest.fn();

    lastRouteResolvedMock.mockReturnValue( { url: '' } );

    DI.bind( 'router', {
        generate: generateMock,
        activePageWidget: DummyWidget,
        lastRouteResolved: lastRouteResolvedMock,
        activePageOptions: {
            path: 'base',
            text: 'Base page'
        }
    } );

    generateMock.mockReturnValue( '/base' );

    const meta = renderer( ActivePageContainer, {} );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'correct process dynamic placet', () => {
    const generateMock = jest.fn();
    const lastRouteResolvedMock = jest.fn();

    lastRouteResolvedMock.mockReturnValue( { url: '' } );

    DI.bind( 'router', {
        generate: generateMock,
        activePageWidget: DummyWidget,
        lastRouteResolved: lastRouteResolvedMock,
        activePageOptions: {
            path: 'base',
            text: 'Base page'
        }
    } );

    generateMock.mockReturnValue( '/base' );

    const meta = renderer( DynamicPlaceActivePageContainer, {
        withWrapper: false
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    meta.widget.update( {
        withWrapper: true
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
