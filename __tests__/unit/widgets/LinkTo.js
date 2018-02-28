import LinkTo from '../../../src/widgets/LinkTo';
import renderer from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const meta = renderer( LinkTo, {} );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
