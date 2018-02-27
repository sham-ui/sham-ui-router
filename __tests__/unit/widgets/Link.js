import Link from '../../../src/widgets/Link.sht';
import renderer from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const meta = renderer( Link, {} );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
