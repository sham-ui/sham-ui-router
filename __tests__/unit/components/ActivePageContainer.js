import { createDI } from 'sham-ui';
import { storage } from '../../../src/storage';
import ActivePageContainer from '../../../src/ActivePageContainer';
import renderer, { compile } from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const DI = createDI();

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

    const meta = renderer( ActivePageContainer, {}, { DI } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'correct process dynamic placet', () => {
    const DI = createDI();

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
            withWrapper: false
        },
        {
            DI
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
    meta.component.update( {
        withWrapper: true
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
