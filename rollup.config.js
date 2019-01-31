import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import json from 'rollup-plugin-json'

const plugins = [
  json(),
  resolve(),
  typescript({ module: 'CommonJS' }),
  commonjs({ extensions: ['.js', '.ts'] }),
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
