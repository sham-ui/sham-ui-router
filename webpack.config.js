const webpack = require( 'webpack' );

const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin( {
        ACTIVE_PAGE_CONTAINER_TYPE: JSON.stringify( 'active-page-container' ),
        ACTIVE_PAGE_LINK_TYPE: JSON.stringify( 'link-to-active-page' )
    } )
];

module.exports = {
    entry: {
        index: './src/index.js',
        'link-to': './src/components/LinkTo.sfc',
        'active-page-container': './src/components/ActivePageContainer.js'
    },
    output: {
        path: __dirname,
        filename: '[name].js',
        publicPath: '/',
        library: [ 'sham-ui-router', 'sham-ui-router/[name]' ],
        libraryTarget: 'umd'
    },
    externals: [
        'sham-ui',
        'sham-ui-directives',
        'navigo'
    ],
    plugins: plugins,
    module: {
        rules: [ {
            test: /(\.js)$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            include: __dirname
        }, {
            test: /\.sht/,
            loader: 'sham-ui-templates-loader?{}'
        }, {
            test: /\.sfc$/,
            use: [
                { loader: 'babel-loader' },
                {
                    loader: 'sham-ui-templates-loader?hot',
                    options: {
                        asModule: false,
                        asSingleFileComponent: true
                    }
                }
            ]
        } ]
    }
};
