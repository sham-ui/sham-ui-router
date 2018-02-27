import BarPage from '../../../src/widgets/BarPage.sht';
import renderer from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const meta = renderer( BarPage, {} );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
