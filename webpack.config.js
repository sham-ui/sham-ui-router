const webpack = require( 'webpack' );

const plugins = [
    new webpack.NoEmitOnErrorsPlugin()
];

module.exports = {
    entry: {
        index: './src/index.js',
        'link-to': './src/components/LinkTo.sfc',
        'active-page-container': './src/components/ActivePageContainer.js',
        'href-to': './src/directives/href-to.js',
        'params': './src/builders/params.js'
    },
    output: {
        path: __dirname,
        filename: '[name].js',
        publicPath: '/',
        library: [ 'sham-ui-router', 'sham-ui-router/[name]' ],
        libraryTarget: 'commonjs2'
    },
    externals: [
        'sham-ui',
        'sham-ui-directives',
        'sham-ui-data-storage',
        'navigo',
        /^(core-js)/
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
