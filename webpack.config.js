const webpack = require( 'webpack' );

const plugins = [
    new webpack.NoEmitOnErrorsPlugin()
];

if ( process.env.WEBPACK_ENV === 'build' ) {
    plugins.push( new webpack.optimize.UglifyJsPlugin( { minimize: true } ) );
}

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
        libraryTarget: 'umd'
    },
    plugins: plugins,
    module: {
        loaders: [ {
            test: /(\.js)$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            include: __dirname
        }, {
            test: /\.sht/,
            loader: 'sham-ui-templates-loader'
        } ]
    }
};
