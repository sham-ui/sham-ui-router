import FooPage from '../../../src/widgets/FooPage.sht';
import renderer from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const meta = renderer( FooPage, {} );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
