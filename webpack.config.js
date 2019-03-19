const webpack = require( 'webpack' );

const plugins = [
    new webpack.NoEmitOnErrorsPlugin()
];

module.exports = {
    entry: {
        index: './src/index.js',
        'link-to': './src/widgets/LinkTo.js',
        'active-page-container': './src/widgets/ActivePageContainer.js'
    },
    output: {
        path: __dirname,
        filename: '[name].js',
        publicPath: '/',
        library: [ 'sham-ui-router', 'sham-ui-router/[name]' ],
        libraryTarget: 'commonjs2'
    },
    externals: [
        'sham-ui'
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
            test: /\.sfw$/,
            use: [
                { loader: 'babel-loader' },
                {
                    loader: 'sham-ui-templates-loader?hot',
                    options: {
                        asModule: false,
                        asSingleFileWidget: true
                    }
                }
            ]
        } ]
    }
};
