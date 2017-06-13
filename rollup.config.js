import 'rollup'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import license from 'rollup-plugin-license'
import nodeResolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import uglify from 'rollup-plugin-uglify'
import {minify} from 'uglify-js'

const config = {
  entry: 'compiled/src/index.js',
  exports: 'auto',
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    buble(),
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
    uglify({}, minify),
    license({
      banner: '<%= pkg.name %>@<%= pkg.version %>',
    }),
  ],
  targets: [
    {
      dest: 'dist/index.js',
      format: 'cjs',
      sourceMap: false,
    },
  ],
  useStrict: false,
}

export default config
