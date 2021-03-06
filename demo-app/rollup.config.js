import path from 'path';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import cleaner from 'rollup-plugin-cleaner';
import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import shamUICompiler from 'rollup-plugin-sham-ui-templates';

export default {
    input: path.join( __dirname, 'src/main.js' ),
    output: {
        file: path.join( __dirname, 'dist/bundle.js' ),
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        cleaner( {
            targets: [
                path.join( __dirname, 'dist' )
            ]
        } ),
        replace( {
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
        } ),
        shamUICompiler( {
            extensions: [ '.sht' ],
            compilerOptions: {
                removeDataTest: false
            }
        } ),
        shamUICompiler( {
            extensions: [ '.sfc' ],
            compilerOptions: {
                asModule: false,
                asSingleFileComponent: true,
                removeDataTest: false
            }
        } ),
        babel( {
            extensions: [ '.js', '.sht', '.sfc' ],
            exclude: [ 'node_modules/**' ],
            babelHelpers: 'bundled'
        } ),
        nodeResolve( {
            browser: true
        } ),
        commonjs(),
        scss( {
            failOnError: true,
            output: path.join( __dirname, 'dist/bundle.css' ),
            watch: path.join( __dirname, 'src/styles' ),
            sass: require( 'sass' )
        } ),
        serve( {
            port: 3000,
            contentBase: __dirname,
            historyApiFallback: '/index.html'
        } ),
        livereload( {
            watch: path.join( __dirname, 'dist' )
        } )
    ]
};
