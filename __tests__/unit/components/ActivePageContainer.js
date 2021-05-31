import { createDI } from 'sham-ui';
import { storage } from '../../../src/storage';
import ActivePageContainer from '../../../src/ActivePageContainer';
import renderer, { compile } from 'sham-ui-test-helpers';

const DI = createDI();

afterEach( () => {
    DI.resolve( 'router:storage' ).reset();
} );

it( 'renders correctly', () => {
    const generateMock = jest.fn();

    const routerStorage = storage( DI );

    DI.bind( 'router', {
        storage: routerStorage,
        generate: generateMock
    } );
    routerStorage.activePageComponent = compile`
        <h1>Title</h1>
        <div>Content for dummy component</div>
    `;
    routerStorage.activePageOptions = {
        path: 'base',
        text: 'Base page'
    };
    routerStorage.sync();

    generateMock.mockReturnValue( '/base' );

    const meta = renderer( ActivePageContainer, { DI } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'correct process dynamic placet', () => {
    const generateMock = jest.fn();

    const routerStorage = storage( DI );

    DI.bind( 'router', {
        storage: routerStorage,
        generate: generateMock
    } );
    routerStorage.activePageComponent = compile`
        <h1>Title</h1>
        <div>Content for dummy component</div>
    `;
    routerStorage.activePageOptions = {
        path: 'base',
        text: 'Base page'
    };
    routerStorage.sync();

    generateMock.mockReturnValue( '/base' );

    const meta = renderer(
        compile( {
            ActivePageContainer
        } )`
        {% if withWrapper %}
            <div class="wrapper">
                <ActivePageContainer/>
            </div>
        {% else %}
            <ActivePageContainer/>
        {% endif %}
        `,
        {
            DI,
            withWrapper: false
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
    meta.component.update( {
        withWrapper: true
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
