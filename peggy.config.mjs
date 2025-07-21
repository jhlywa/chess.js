export default {
  input: 'src/pgn.peggy',
  output: 'src/pgn.js',
  format: 'es',
  dts: true,
  allowedStartRules: ['pgn'],
  returnTypes: {
    pgn: '{ headers: Record<string, string>, root: import("./node").Node, result?: string }',
  },
}
