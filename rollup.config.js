import path from 'path';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import shamUICompiler from 'rollup-plugin-sham-ui-templates';
import pkg from './package.json';

const main = path.dirname( pkg.main );
const module = path.dirname( pkg.module );

export default [ {
    input: './src/index.js',
    external: [
        'navigo',
        'sham-ui',
        'sham-ui-macro/ref.macro',
        'sham-ui-data-storage',
        /@babel\/runtime/,
        /@corejs/,
        './storage'
    ],
    output: [
        { file: pkg.main, format: 'cjs', exports: 'auto' },
        { file: pkg.module, format: 'es' }
    ],
    plugins: [
        babel( {
            exclude: [ 'node_modules/**' ],
            babelHelpers: 'inline'
        } )
    ]
}, {
    input: './src/components/LinkTo.sfc',
    external: [
        'sham-ui',
        'sham-ui-macro/ref.macro',
        'sham-ui-data-storage',
        /@babel\/runtime/,
        /@corejs/
    ],
    output: [
        { file: path.join( main, 'link-to.js' ), format: 'cjs', exports: 'auto' },
        { file: path.join( module, 'link-to.js' ), format: 'es' }
    ],
    plugins: [
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
            babelHelpers: 'inline'
        } ),
        nodeResolve( {
            browser: true
        } ),
        commonjs()
    ]
}, {
    input: './src/builders/params.js',
    external: [
        'sham-ui',
        'sham-ui-macro/ref.macro',
        /@babel\/runtime/,
        'sham-ui-data-storage',
        /@corejs/
    ],
    output: [
        { file: path.join( main, 'params.js' ), format: 'cjs', exports: 'auto' },
        { file: path.join( module, 'params.js' ), format: 'es' }
    ],
    plugins: [
        babel( {
            exclude: [ 'node_modules/**' ],
            babelHelpers: 'inline'
        } )
    ]
}, {
    input: './src/directives/href-to.js',
    external: [
        'sham-ui',
        'sham-ui-macro/ref.macro',
        /@babel\/runtime/,
        'sham-ui-data-storage',
        /@corejs/
    ],
    output: [
        { file: path.join( main, 'href-to.js' ), format: 'cjs', exports: 'auto' },
        { file: path.join( module, 'href-to.js' ), format: 'es' }
    ],
    plugins: [
        babel( {
            exclude: [ 'node_modules/**' ],
            babelHelpers: 'inline'
        } )
    ]
}, {
    input: './src/ActivePageContainer.js',
    external: [
        'sham-ui',
        'sham-ui-macro/ref.macro',
        /@babel\/runtime/,
        'sham-ui-data-storage',
        /@corejs/,
        './storage'
    ],
    output: [
        { file: path.join( main, 'active-page-container.js' ), format: 'cjs', exports: 'auto' },
        { file: path.join( module, 'active-page-container.js' ), format: 'es' }
    ],
    plugins: [
        babel( {
            exclude: [ 'node_modules/**' ],
            babelHelpers: 'inline'
        } )
    ]
}, {
    input: './src/storage.js',
    external: [
        'sham-ui',
        'sham-ui-macro/ref.macro',
        /@babel\/runtime/,
        /@corejs/,
        'sham-ui-data-storage'
    ],
    output: [
        { file: path.join( main, 'storage.js' ), format: 'cjs', exports: 'auto' },
        { file: path.join( module, 'storage.js' ), format: 'es' }
    ],
    plugins: [
        babel( {
            exclude: [ 'node_modules/**' ],
            babelHelpers: 'inline'
        } )
    ]
} ];
