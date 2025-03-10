import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'
import { dotenv } from './src/server/util'

const env = dotenv()

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
      minify: env?.NODE_ENV === 'production',
      sourceMap: env?.NODE_ENV === 'development',
    }),
    json(),
  ],
}
