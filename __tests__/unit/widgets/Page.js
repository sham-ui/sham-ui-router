import Page from '../../../src/widgets/Page.sht';
import renderer from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const meta = renderer( Page, {} );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
