import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

export default {
  input: 'src/server/index.ts',
  output: {
    file: './dist/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    resolve({ preferBuiltins: true, }),
    commonjs(),
    typescript(),
    json(),
  ],
}
