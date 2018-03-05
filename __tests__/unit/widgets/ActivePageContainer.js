import { DI } from 'sham-ui';
import ActivePageContainer from '../../../src/widgets/ActivePageContainer';
import DummyWidget from './Dummy.sht';
import renderer from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const generateMock = jest.fn();

    DI.bind( 'router', {
        generate: generateMock,
        activePageWidget: DummyWidget,
        activePageOptions: {
            path: 'base',
            text: 'Base page'
        }
    } );

    generateMock.mockReturnValue( '/base' );

    const meta = renderer( ActivePageContainer, {} );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
