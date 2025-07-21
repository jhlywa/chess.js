import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { dts } from 'rollup-plugin-dts'

export default [
  {
    input: 'src/chess.ts',
    output: {
      file: 'dist/cjs/chess.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.cjs.json',
        sourceMap: true,
      }),
    ],
  },
  {
    input: 'src/chess.ts',
    output: {
      file: 'dist/esm/chess.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.esm.json',
        sourceMap: true,
      }),
    ],
  },
  {
    input: 'src/chess.ts',
    output: {
      file: 'dist/types/chess.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
]
