import { Chess } from '../../src/chess'

// If the king makes a normal move one space left or right (without the
// intention to castle) it should not be mistaken for a castling-move.
// Other castling-moves (moving more than one space, or moving onto a rook) are
// easy to distinguish.

function expandFenRow(fen: string, row: number): string {
  let str = ''
  fen
    .split(' ')[0]
    .split('/')
    [row].split('')
    .forEach((ch) => {
      const val = parseInt(ch)
      if (val) {
        str += '........'.substr(0, val)
      } else {
        str += ch
      }
    })
  return str
}

function getMove(rowStr: string, kingCh: string, dir: number) {
  const fromCol = rowStr.indexOf(kingCh)
  const rank = kingCh == 'K' ? 1 : 8
  return {
    from: 'abcdefgh'.charAt(fromCol) + rank,
    to: 'abcdefgh'.charAt(fromCol + dir) + rank,
  }
}

function moveBlackKingRight(fen: string) {
  const row8 = expandFenRow(fen, 0)
  return getMove(row8, 'k', 1)
}
function moveBlackKingLeft(fen: string) {
  const row8 = expandFenRow(fen, 0)
  return getMove(row8, 'k', -1)
}
function moveWhiteKingLeft(fen: string) {
  const row1 = expandFenRow(fen, 7)
  return getMove(row1, 'K', -1)
}
function moveWhiteKingRight(fen: string) {
  const row1 = expandFenRow(fen, 7)
  return getMove(row1, 'K', 1)
}

test.each([
  {
    before: 'k7/8/8/8/8/8/8/5K1R w K - 0 1',
    after: 'k7/8/8/8/8/8/8/6KR b - - 1 1',
  },
  {
    before: 'k7/8/8/8/8/8/8/4K2R w K - 0 1',
    after: 'k7/8/8/8/8/8/8/5K1R b - - 1 1',
  },
  {
    before: 'k7/8/8/8/8/8/8/3K3R w K - 0 1',
    after: 'k7/8/8/8/8/8/8/4K2R b - - 1 1',
  },
  {
    before: 'k7/8/8/8/8/8/8/2K4R w K - 0 1',
    after: 'k7/8/8/8/8/8/8/3K3R b - - 1 1',
  },
  {
    before: 'k7/8/8/8/8/8/8/1K5R w K - 0 1',
    after: 'k7/8/8/8/8/8/8/2K4R b - - 1 1',
  },
  {
    before: 'k7/8/8/8/8/8/8/1K1R4 w K - 0 1',
    after: 'k7/8/8/8/8/8/8/2KR4 b - - 1 1',
  },
])(
  'white king should not castle kingside when moved one space right',
  ({ before, after }) => {
    const chess = new Chess(before, { enable960: true })
    chess.move(moveWhiteKingRight(before))
    expect(chess.fen()).toEqual(after)
  },
)

test.each([
  {
    before: 'k7/8/8/8/8/8/8/R1K5 w Q - 0 1',
    after: 'k7/8/8/8/8/8/8/RK6 b - - 1 1',
  },
  {
    before: 'k7/8/8/8/8/8/8/R2K4 w Q - 0 1',
    after: 'k7/8/8/8/8/8/8/R1K5 b - - 1 1',
  },
  {
    before: 'k7/8/8/8/8/8/8/R3K3 w Q - 0 1',
    after: 'k7/8/8/8/8/8/8/R2K4 b - - 1 1',
  },
  {
    before: 'k7/8/8/8/8/8/8/R4K2 w Q - 0 1',
    after: 'k7/8/8/8/8/8/8/R3K3 b - - 1 1',
  },
  {
    before: 'k7/8/8/8/8/8/8/R5K1 w Q - 0 1',
    after: 'k7/8/8/8/8/8/8/R4K2 b - - 1 1',
  },
  {
    before: 'k7/8/8/8/8/8/8/3R1K2 w Q - 0 1',
    after: 'k7/8/8/8/8/8/8/3RK3 b - - 1 1',
  },
])(
  'white king should not castle queenside when moved one space left',
  ({ before, after }) => {
    const chess = new Chess(before, { enable960: true })
    chess.move(moveWhiteKingLeft(before))
    expect(chess.fen()).toEqual(after)
  },
)

test.each([
  {
    before: '5k1r/8/8/8/8/8/8/K7 b K - 0 1',
    after: '6kr/8/8/8/8/8/8/K7 w - - 1 2',
  },
  {
    before: '4k2r/8/8/8/8/8/8/K7 b K - 0 1',
    after: '5k1r/8/8/8/8/8/8/K7 w - - 1 2',
  },
  {
    before: '3k3r/8/8/8/8/8/8/K7 b K - 0 1',
    after: '4k2r/8/8/8/8/8/8/K7 w - - 1 2',
  },
  {
    before: '2k4r/8/8/8/8/8/8/K7 b K - 0 1',
    after: '3k3r/8/8/8/8/8/8/K7 w - - 1 2',
  },
  {
    before: '1k5r/8/8/8/8/8/8/K7 b K - 0 1',
    after: '2k4r/8/8/8/8/8/8/K7 w - - 1 2',
  },
  {
    before: '3k1r2/8/8/8/8/8/8/K7 b K - 0 1',
    after: '4kr2/8/8/8/8/8/8/K7 w - - 1 2',
  },
])(
  'black king should not castle kingside when moved one space right',
  ({ before, after }) => {
    const chess = new Chess(before, { enable960: true })
    chess.move(moveBlackKingRight(before))
    expect(chess.fen()).toEqual(after)
  },
)

test.each([
  {
    before: 'r1k5/8/8/8/8/8/8/K7 b Q - 0 1',
    after: 'rk6/8/8/8/8/8/8/K7 w - - 1 2',
  },
  {
    before: 'r2k4/8/8/8/8/8/8/K7 b Q - 0 1',
    after: 'r1k5/8/8/8/8/8/8/K7 w - - 1 2',
  },
  {
    before: 'r3k3/8/8/8/8/8/8/K7 b Q - 0 1',
    after: 'r2k4/8/8/8/8/8/8/K7 w - - 1 2',
  },
  {
    before: 'r4k2/8/8/8/8/8/8/K7 b Q - 0 1',
    after: 'r3k3/8/8/8/8/8/8/K7 w - - 1 2',
  },
  {
    before: 'r5k1/8/8/8/8/8/8/K7 b Q - 0 1',
    after: 'r4k2/8/8/8/8/8/8/K7 w - - 1 2',
  },
  {
    before: '3r1k2/8/8/8/8/8/8/K7 b Q - 0 1',
    after: '3rk3/8/8/8/8/8/8/K7 w - - 1 2',
  },
])(
  'black king should not castle queenside when moved one space left',
  ({ before, after }) => {
    const chess = new Chess(before, { enable960: true })
    chess.move(moveBlackKingLeft(before))
    expect(chess.fen()).toEqual(after)
  },
)
