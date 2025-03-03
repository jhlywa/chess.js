import { generateChess960Fen } from '../../src/chess'

function areBishopsOnDifferentColorSquares(
  blackPieces: Array<string>,
): boolean {
  const bishop1Pos = blackPieces.indexOf('b')
  const bishop2Pos = blackPieces.indexOf('b', bishop1Pos + 1)
  return (bishop2Pos - bishop1Pos) % 2 == 1
}

function isKingBetweenRooks(blackPieces: Array<string>): boolean {
  const rook1Pos = blackPieces.indexOf('r')
  const kingPos = blackPieces.indexOf('k', rook1Pos)
  const rook2Pos = blackPieces.indexOf('r', kingPos)
  return rook1Pos < kingPos && kingPos < rook2Pos
}

function rowHasStandardPieces(blackPieces: Array<string>): boolean {
  return (
    blackPieces.filter((pc) => pc == 'r').length == 2 &&
    blackPieces.filter((pc) => pc == 'n').length == 2 &&
    blackPieces.filter((pc) => pc == 'b').length == 2 &&
    blackPieces.filter((pc) => pc == 'q').length == 1 &&
    blackPieces.filter((pc) => pc == 'k').length == 1
  )
}

function whiteRowMirrorsBlackRow(
  blackPieces: Array<string>,
  whitePieces: Array<string>,
): boolean {
  for (let i = 0; i < blackPieces.length; i++) {
    const bPiece = blackPieces[i]
    const wPiece = whitePieces[i].toLowerCase()
    if (bPiece != wPiece) {
      return false
    }
  }
  return true
}

function checkFen(fen: string) {
  const parts = fen.split(' ')
  expect(parts.length).toEqual(6)
  expect(parts[0].length).toEqual(43)
  expect(parts[1]).toEqual('w')
  expect(parts[2]).toEqual('KQkq')
  expect(parts[3]).toEqual('-')
  expect(parts[4]).toEqual('0')
  expect(parts[5]).toEqual('1')

  const rows = parts[0].split('/')
  expect(rows.length).toEqual(8)

  expect(rows[0].length).toEqual(8)
  expect(rows[1]).toEqual('pppppppp')
  expect(rows[2]).toEqual('8')
  expect(rows[3]).toEqual('8')
  expect(rows[4]).toEqual('8')
  expect(rows[5]).toEqual('8')
  expect(rows[6]).toEqual('PPPPPPPP')
  expect(rows[7].length).toEqual(8)

  const blackPieces = rows[0].split('')
  const whitePieces = rows[7].split('')

  expect(whiteRowMirrorsBlackRow(blackPieces, whitePieces)).toBeTruthy()

  expect(rowHasStandardPieces(blackPieces)).toBeTruthy()

  expect(areBishopsOnDifferentColorSquares(blackPieces)).toBeTruthy()

  expect(isKingBetweenRooks(blackPieces)).toBeTruthy()
}

test('generated chess960 fen should be valid', () => {
  // The fen returned is randomly generated. If there is a problems, it may
  // be impossible to reproduce.
  for (let i = 0; i < 50; i++) {
    // Run multiple times to exercise function.
    checkFen(generateChess960Fen())
  }
})
