import Router from '../../../src/widgets/Router';
import renderer from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const meta = renderer( Router, {} );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
