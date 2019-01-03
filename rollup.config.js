import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

const plugins = [
  resolve(),
  commonjs(),
  babel({
    runtimeHelpers: true,
    exclude: 'node_modules/**'
  })
]

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'dist/bundle.js',
      format: 'umd',
      name: 'warsman',
      sourcemap: true
    },
    plugins
  },
  {
    input: 'src/bin.js',
    output: {
      banner: '#!/usr/bin/env node',
      file: 'bin/warsman',
      format: 'umd'
    },
    plugins
  }
]
