import ActivePageContainer from '../../../src/widgets/ActivePageContainer';
import renderer from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const meta = renderer( ActivePageContainer, {} );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
