import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'

const plugins = [typescript(), commonjs()]

export default [
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/bundle.js',
      format: 'umd',
      name: 'warsman',
      sourcemap: true
    },
    plugins
  },
  {
    input: 'src/bin.ts',
    output: {
      banner: '#!/usr/bin/env node',
      file: 'bin/warsman',
      format: 'umd'
    },
    plugins
  }
]
