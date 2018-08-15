import { DI } from 'sham-ui';
import ActivePageContainer from './ActivePageContainer.sht';

export default class extends ActivePageContainer {
    constructor() {
        super( ...arguments );
        DI.bind( 'widgets:active-page-container', this );
    }

    render() {
        super.render( ...arguments );
        const router = DI.resolve( 'router' );
        this.remove();
        // eslint-disable-next-line no-undef
        ShamUIView.insert(
            this,
            this.container,
            { ref: null },
            router.activePageWidget,
            router.activePageOptions
        );
    }
}
