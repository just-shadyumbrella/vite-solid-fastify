import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'
import { config } from 'dotenv'

config()

export default {
  input: 'src/server/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    esbuild({
      minify: process.env.NODE_ENV === 'production',
      sourceMap: process.env.NODE_ENV === 'development',
    }),
    json(),
  ],
}
