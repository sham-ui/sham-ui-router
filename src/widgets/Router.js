import { DI, options } from 'sham-ui';
import RouterWidget from './Router.sht';

export default class extends RouterWidget {
    constructor() {
        super( ...arguments );
        DI.bind( 'widgets:router', this );
        this._lastRenderedPage = null;
    }

    render() {
        super.render( ...arguments );
        const router = DI.resolve( 'router' );
        this.remove();
        ShamUIView.insert(
            this,
            this.container,
            { ref: null },
            router.activePageWidget,
            router.activePageOptions
        );
    }
}