# chess.js

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/jhlywa/chess.js/node.js.yml)](https://github.com/jhlywa/chess.js/actions)
[![npm](https://img.shields.io/npm/v/chess.js?color=blue)](https://www.npmjs.com/package/chess.js)
[![npm](https://img.shields.io/npm/dm/chess.js)](https://www.npmjs.com/package/chess.js)

chess.js is a TypeScript chess library used for chess move
generation/validation, piece placement/movement, and check/checkmate/stalemate
detection - basically everything but the AI.

chess.js has been extensively tested in node.js and most modern browsers.

## Installation

Run the following command to install the most recent version of chess.js from
NPM:

```sh
npm install chess.js
```

## Importing

### Import (as ESM)

```js
import { Chess } from 'chess.js'
```

ECMAScript modules (ESM) can be directly imported in a browser:

```html
<script type="module">
  import { Chess } from 'chess.js'
</script>
```

### Import (as CommonJS)

```js
const { Chess } = require('chess.js')
```

## Example Code

The code below plays a random game of chess:

```js
import { Chess } from 'chess.js'

const chess = new Chess()

while (!chess.isGameOver()) {
  const moves = chess.moves()
  const move = moves[Math.floor(Math.random() * moves.length)]
  chess.move(move)
}
console.log(chess.pgn())
```

## User Interface

By design, chess.js is a headless library and does not include user interface
elements. Many developers have successfully integrated chess.js with the
[chessboard.js](http://chessboardjs.com) library. See
[chessboard.js - Random vs Random](http://chessboardjs.com/examples#5002) for an
example.

## Parsers (permissive / strict)

This library includes two parsers (`permissive` and `strict`) which are used to
parse different forms of chess move notation. The `permissive` parser (the
default) is able to handle many non-standard derivatives of algebraic notation
(e.g. `Nf3`, `g1f3`, `g1-f3`, `Ng1f3`, `Ng1-f3`, `Ng1xf3`). The `strict` parser
only accepts moves in Standard Algebraic Notation and requires that they
strictly adhere to the specification. The `strict` parser runs slightly faster
but will not parse any non-standard notation.

## API

### Constants

The following constants are exported from the top-level module:

```ts
// colors
export const WHITE = 'w'
export const BLACK = 'b'

// pieces
export const PAWN = 'p'
export const KNIGHT = 'n'
export const BISHOP = 'b'
export const ROOK = 'r'
export const QUEEN = 'q'
export const KING = 'k'

// starting position (in FEN)
export const DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

// square list
export const SQUARES = ['a8', 'b8', 'c8', ..., 'f1', 'g1', 'h1']
```

### Constructor: Chess([ fen ], { skipValidation = false } = {})

The Chess() constructor creates a new chess object that default to the initial
board position. It accepts two optional parameters : a string which specifies
the board configuration in
[Forsyth-Edwards Notation (FEN)](http://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation),
and an object with a `skipValidation` boolean. By default the constructor will
throw an exception if an invalid FEN string is provided. This behavior can be
skipped by setting the `skipValidation` boolean.

```ts
import { Chess } from 'chess.js'

// an empty constructor defaults the starting position
let chess = new Chess()

// pass in a FEN string to load a particular position
let chess = new Chess(
  'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - - 0 19',
)

// the white king is missing from the FEN string below
let chess = new Chess(
  'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R52 b - - 0 19',
  { skipValidation = true },
)
```

### .ascii()

Returns a string containing an ASCII diagram of the current position.

```ts
const chess = new Chess()

// make some moves
chess.move('e4')
chess.move('e5')
chess.move('f4')

chess.ascii()
// -> '   +------------------------+
//      8 | r  n  b  q  k  b  n  r |
//      7 | p  p  p  p  .  p  p  p |
//      6 | .  .  .  .  .  .  .  . |
//      5 | .  .  .  .  p  .  .  . |
//      4 | .  .  .  .  P  P  .  . |
//      3 | .  .  .  .  .  .  .  . |
//      2 | P  P  P  P  .  .  P  P |
//      1 | R  N  B  Q  K  B  N  R |
//        +------------------------+
//          a  b  c  d  e  f  g  h'
```

### .attackers(square, [ color ])

Returns a list of squares that have pieces belonging to the side to move that
can attack the given square. This function takes an optional parameter which can
change which color the pieces should belong to.

```ts
const chess = new Chess()

chess.attackers('f3')
// -> ['e2', 'g2', 'g1'] (empty squares can be attacked)

chess.attackers('e2')
// -> ['d1', 'e1', 'f1', 'g1'] (we can attack our own pieces)

chess.attackers('f6')
// -> [] (squares not attacked by the side to move will return an empty list)

chess.move('e4')
chess.attackers('f6')
// -> ['g8', 'e7', 'g7'] (return value changes depending on side to move)

chess.attackers('f3', WHITE)
// -> ['g2', 'd1', 'g1'] (side to move can be ignored by specifying a color)

chess.load('4k3/4n3/8/8/8/8/4R3/4K3 w - - 0 1')
chess.attackers('c6', BLACK)
// -> ['e7'] (pieces still attack a square even if they are pinned)
```

### .board()

Returns a 2D array representation of the current position. Empty squares are
represented by `null`.

```ts
const chess = new Chess()

chess.board()
// -> [[{square: 'a8', type: 'r', color: 'b'},
//      {square: 'b8', type: 'n', color: 'b'},
//      {square: 'c8', type: 'b', color: 'b'},
//      {square: 'd8', type: 'q', color: 'b'},
//      {square: 'e8', type: 'k', color: 'b'},
//      {square: 'f8', type: 'b', color: 'b'},
//      {square: 'g8', type: 'n', color: 'b'},
//      {square: 'h8', type: 'r', color: 'b'}],
//      [...],
//      [...],
//      [...],
//      [...],
//      [...],
//      [{square: 'a1', type: 'r', color: 'w'},
//       {square: 'b1', type: 'n', color: 'w'},
//       {square: 'c1', type: 'b', color: 'w'},
//       {square: 'd1', type: 'q', color: 'w'},
//       {square: 'e1', type: 'k', color: 'w'},
//       {square: 'f1', type: 'b', color: 'w'},
//       {square: 'g1', type: 'n', color: 'w'},
//       {square: 'h1', type: 'r', color: 'w'}]]
```

### .clear({ preserveHeaders = false } = {})

Clears the board.

```ts
chess.clear()
chess.fen()
// -> '8/8/8/8/8/8/8/8 w - - 0 1' <- empty board
```

### .fen({ forceEnpassantSquare = false) = {})

Returns the FEN string for the current position. Note, the en passant square is
only included if the side-to-move can legally capture en passant.

The enpassant square will always be included if forceEnpassantSquare is true.

```ts
const chess = new Chess()

// make some moves
chess.move('e4')
chess.move('e5')
chess.move('f4')

chess.fen()
// -> 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2'
```

### .findPiece(piece)

Returns a list containing the squares where the requested piece is located.
Returns an empty list if the piece is not on the board.

```ts
const chess = new Chess()

chess.findPiece({ type: KING, color: BLACK })
// -> ['e8']
chess.findPiece({ type: BISHOP, color: WHITE })
// -> ['c1', 'f1']
chess.remove('d1')
chess.findPiece({ type: QUEEN, color: WHITE })
// -> []
```

### .get(square)

Returns the piece on the square. Returns `undefined` if the square is empty.

```ts
chess.put({ type: PAWN, color: BLACK }, 'a5') // put a black pawn on a5

chess.get('a5')
// -> { type: 'p', color: 'b' },
chess.get('a6')
// -> undefined
```

### .getCastlingRights(color)

Gets the castling rights for the given color. An object is returned which
indicates whether the right is available or not for both kingside and queenside.
Note this does not indicate if such a move is legal or not in the current
position as checks etc. also need to be considered.

```ts
const chess = new Chess()

chess.getCastlingRights(BLACK) // black can castle queenside only
// -> { 'k': false, 'q': true }
```

### .getComment()

Retrieve the comment for the current position, if it exists.

```ts
const chess = new Chess()

chess.loadPgn('1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 {giuoco piano} *')

chess.getComment()
// -> "giuoco piano"
```

### .getComments()

Retrieve comments for all positions.

```ts
const chess = new Chess()

chess.loadPgn(
  "1. e4 e5 {king's pawn opening} 2. Nf3 Nc6 3. Bc4 Bc5 {giuoco piano} *",
)

chess.getComments()
// -> [
//     {
//       fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
//       comment: "king's pawn opening"
//     },
//     {
//       fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
//       comment: "giuoco piano"
//     }
//    ]
```

### .getHeaders()

Retrieve the PGN headers.

```ts
chess.setHeader('White', 'Morphy')
chess.setHeader('Black', 'Anderssen')
chess.setHeader('Date', '1858-??-??')
chess.getHeaders()
// -> { White: 'Morphy', Black: 'Anderssen', Date: '1858-??-??' }
```

### .hash()

Returns a unique 64-bit hash as a hexidecimal string for the current position.

```ts
chess.hash()
// -> '3436f01fd716346e'
```

### .history([ options ])

Returns a list containing the moves of the current game. Options is an optional
parameter which may contain a 'verbose' flag. See .moves() for a description of
the verbose move fields. A FEN string of the position _prior_ to the move being
made is added to the verbose history output.

```ts
const chess = new Chess()
chess.move('e4')
chess.move('e5')
chess.move('f4')
chess.move('exf4')

chess.history()
// -> ['e4', 'e5', 'f4', 'exf4']

chess.history({ verbose: true })
// -->
// [
//   {
//     before: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
//     after: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
//     color: 'w',
//     piece: 'p',
//     from: 'e2',
//     to: 'e4',
//     san: 'e4',
//     lan: 'e2e4',
//   },
//   {
//     before: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
//     after: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
//     color: 'b',
//     piece: 'p',
//     from: 'e7',
//     to: 'e5',
//     san: 'e5',
//     lan: 'e7e5',
//   },
//   {
//     before: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
//     after: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2',
//     color: 'w',
//     piece: 'p',
//     from: 'f2',
//     to: 'f4',
//     san: 'f4',
//     lan: 'f2f4',
//   },
//   {
//     before: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2',
//     after: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3',
//     color: 'b',
//     piece: 'p',
//     from: 'e5',
//     to: 'f4',
//     san: 'exf4',
//     lan: 'e5f4',
//     captured: 'p'
//   }
// ]
```

### .inCheck()

Returns true or false if the side to move is in check.

```ts
const chess = new Chess(
  'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3',
)
chess.inCheck()
// -> true
```

### .isAttacked(square, color)

Returns true if the square is attacked by any piece of the given color.

```ts
const chess = new Chess()
chess.isAttacked('f3', WHITE)
// -> true (we can attack empty squares)

chess.isAttacked('f6', BLACK)
// -> true (side to move (e.g. the value returned by .turn) is ignored)

chess.load(DEFAULT_POSITION)
chess.isAttacked('e2', WHITE)
// -> true (we can attack our own pieces)

chess.load('4k3/4n3/8/8/8/8/4R3/4K3 w - - 0 1')
chess.isAttacked('c6', BLACK)
// -> true (pieces still attack a square even if they are pinned)
```

### .isCheckmate()

Returns true or false if the side to move has been checkmated.

```ts
const chess = new Chess(
  'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3',
)
chess.isCheckmate()
// -> true
```

### .isDraw()

Returns true or false if the game is drawn (50-move rule or insufficient
material).

```ts
const chess = new Chess('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78')
chess.isDraw()
// -> true
```

### .isDrawByFiftyMoves()

Returns true or false if the game is drawn by 50-move rule.

```ts
const chess = new Chess('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78')
chess.isDrawByFiftyMoves()
// -> true
```

### .isInsufficientMaterial()

Returns true if the game is drawn due to insufficient material (K vs. K, K vs.
KB, or K vs. KN) otherwise false.

```ts
const chess = new Chess('k7/8/n7/8/8/8/8/7K b - - 0 1')
chess.isInsufficientMaterial()
// -> true
```

### .isGameOver()

Returns true if the game has ended via checkmate, stalemate, draw, threefold
repetition, or insufficient material. Otherwise, returns false.

```ts
const chess = new Chess()
chess.isGameOver()
// -> false

// stalemate
chess.load('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78')
chess.isGameOver()
// -> true

// checkmate
chess.load('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3')
chess.isGameOver()
// -> true
```

### .isStalemate()

Returns true or false if the side to move has been stalemated.

```ts
const chess = new Chess('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78')
chess.isStalemate()
// -> true
```

### .isThreefoldRepetition()

Returns true or false if the current board position has occurred three or more
times.

```ts
const chess = new Chess(
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
)
// -> true
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq occurs 1st time
chess.isThreefoldRepetition()
// -> false

chess.move('Nf3')
chess.move('Nf6')
chess.move('Ng1')
chess.move('Ng8')
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq occurs 2nd time
chess.isThreefoldRepetition()
// -> false

chess.move('Nf3')
chess.move('Nf6')
chess.move('Ng1')
chess.move('Ng8')
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq occurs 3rd time
chess.isThreefoldRepetition()
// -> true
```

### .load(fen: string, { skipValidation = false, preserveHeaders = false } = {})

Clears the board and loads the provided FEN string. The castling rights, en
passant square and move numbers are defaulted to `- - 0 1` if omitted. Throws an
exception if the FEN is invalid.

```ts
const chess = new Chess()
chess.load('4r3/8/2p2PPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45')

try {
  chess.load('8/4p3/8/8/8/8/4P3/6K1 w - - 1 45')
} catch (e) {
  console.error(e)
}
// -> Error: Invalid FEN: missing black king

chess.load('8/4p3/8/8/8/8/4P3/6K1 w - - 1 45', { skipValidation: true })
// -> Works!
```

### .loadPgn(pgn, [ options ])

Load the moves of a game stored in
[Portable Game Notation](http://en.wikipedia.org/wiki/Portable_Game_Notation).
`pgn` should be a string. Options is an optional object which may contain a
string `newlineChar` and a boolean `strict`.

The `newlineChar` is a string representation of a valid RegExp fragment and is
used to process the PGN. It defaults to `\r?\n`. Special characters should not
be pre-escaped, but any literal special characters should be escaped as is
normal for a RegExp. Keep in mind that backslashes in JavaScript strings must
themselves be escaped (see `sloppyPgn` example below). Avoid using a
`newlineChar` that may occur elsewhere in a PGN, such as `.` or `x`, as this
will result in unexpected behavior.

The `strict` flag is a boolean (default: `false`) that instructs chess.js to
only parse moves in Standard Algebraic Notation form. See `.move` documentation
for more information about non-SAN notations.

The method will throw and exception if the PGN fails to parse.

```ts
const chess = new Chess()
const pgn = [
  '[Event "Casual Game"]',
  '[Site "Berlin GER"]',
  '[Date "1852.??.??"]',
  '[EventDate "?"]',
  '[Round "?"]',
  '[Result "1-0"]',
  '[White "Adolf Anderssen"]',
  '[Black "Jean Dufresne"]',
  '[ECO "C52"]',
  '[WhiteElo "?"]',
  '[BlackElo "?"]',
  '[PlyCount "47"]',
  '',
  '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O',
  'd3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
  'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
  'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
  '23.Bd7+ Kf8 24.Bxe7# 1-0',
]

chess.loadPgn(pgn.join('\n'))

chess.ascii()
// -> '  +------------------------+
//     8 | .  r  .  .  .  k  r  . |
//     7 | p  b  p  B  B  p  .  p |
//     6 | .  b  .  .  .  P  .  . |
//     5 | .  .  .  .  .  .  .  . |
//     4 | .  .  .  .  .  .  .  . |
//     3 | .  .  P  .  .  q  .  . |
//     2 | P  .  .  .  .  P  P  P |
//     1 | .  .  .  R  .  .  K  . |
//       +------------------------+
//         a  b  c  d  e  f  g  h'

// Parse non-standard move formats and unusual line separators
const sloppyPgn = [
  '[Event "Wijk aan Zee (Netherlands)"]',
  '[Date "1971.01.26"]',
  '[Result "1-0"]',
  '[White "Tigran Vartanovich Petrosian"]',
  '[Black "Hans Ree"]',
  '[ECO "A29"]',
  '',
  '1. Pc2c4 Pe7e5', // non-standard
  '2. Nc3 Nf6',
  '3. Nf3 Nc6',
  '4. g2g3 Bb4', // non-standard
  '5. Nd5 Nxd5',
  '6. c4xd5 e5-e4', // non-standard
  '7. dxc6 exf3',
  '8. Qb3 1-0',
].join(':')

chess.loadPgn(sloppyPgn, { newlineChar: ':' })
// works by default

chess.loadPgn(sloppyPgn, { newlineChar: ':', strict: true })
// Error: Invalid move in PGN: Pc2c4
```

### .move(move, [ options ])

Makes a move on the board and returns a move object if the move was legal. The
move argument can be either a string in Standard Algebraic Notation (SAN) or a
move object. Throws an 'Illegal move' exception if the move was illegal.

#### .move() - Standard Algebraic Notation (SAN)

```ts
const chess = new Chess()

chess.move('e4')
// -> { color: 'w', from: 'e2', to: 'e4', piece: 'p', san: 'e4' }

chess.move('nf6') // SAN is case sensitive!!
// Error: Invalid move: nf6

chess.move('Nf6')
// -> { color: 'b', from: 'g8', to: 'f6', piece: 'n', san: 'Nf6' }
```

#### .move() - Object Notation

A move object contains `to`, `from` and, `promotion` (only when necessary)
fields.

```ts
const chess = new Chess()

chess.move({ from: 'g2', to: 'g3' })
// -> { color: 'w', from: 'g2', to: 'g3', piece: 'p', san: 'g3' }
```

#### .move() - Permissive Parser

The permissive (default) move parser can be used to parse a variety of
non-standard move notations. Users may specify an `{ strict: true }` flag to
verify that all supplied moves adhere to the Standard Algebraic Notation
specification.

```ts
const chess = new Chess()

// permissive parser accepts various forms of algebraic notation
chess.move('e2e4')
chess.move('e7-e5')
chess.move('Pf2-f4')
chess.move('ef4') // missing 'x' in capture
chess.move('Ng1-f3')
chess.move('d7xd6') // ignore 'x' when not a capture
chess.move('d4')

// correctly parses incorrectly disambiguated moves
chess.load('r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7')

chess.move('Nge7') // Ne7 is unambiguous because the knight on c6 is pinned
chess.undo()
chess.move('Nge7', { strict: true }) // strict SAN requires Ne7
// Error: Invalid move: Nge7
```

### .moveNumber()

Returns the current move number.

```ts
chess.load('4r1k1/p1prnpb1/Pp1pq1pp/3Np2P/2P1P3/R4N2/1PP2PP1/3QR1K1 w - - 2 20')
chess.moveNumber()
// -> 20
```

### .moves({ piece?: Piece, square?: Square, verbose = false} = {})

Returns a list of legal moves from the current position. This function takes an
optional object which can be used to generate detailed move objects or to
restrict the move generator to specific squares or pieces.

```ts
const chess = new Chess()
chess.moves()
// -> ['a3', 'a4', 'b3', 'b4', 'c3', 'c4', 'd3', 'd4', 'e3', 'e4',
//     'f3', 'f4', 'g3', 'g4', 'h3', 'h4', 'Na3', 'Nc3', 'Nf3', 'Nh3']

chess.moves({ square: 'e2' }) // single square move generation
// -> ['e3', 'e4']

chess.moves({ piece: 'n' }) // generate moves for piece type
// ['Na3', 'Nc3', 'Nf3', 'Nh3']

chess.moves({ verbose: true }) // return verbose moves
// -> [{ color: 'w', from: 'a2', to: 'a3',
//       piece: 'p',
//       san: 'a3', lan: 'a2a3',
//       before: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
//       after: 'rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR b KQkq - 0 1'
//       # a `captured` field is included when the move is a capture
//       # a `promotion` field is included when the move is a promotion
//     },
//     ...
//     ]
```

#### Move Object (e.g. when { verbose: true })

The `color` field indicates the color of the moving piece (`w` or `b`).

The `from` and `to` fields are from and to squares in algebraic notation.

The `piece`, `captured`, and `promotion` fields contain the lowercase
representation of the applicable piece (`pnbrqk`). The `captured` and
`promotion` fields are only present when the move is a valid capture or
promotion.

The `san` field is the move in Standard Algebraic Notation (SAN). The `lan`
field is the move in Long Algebraic Notation (LAN).

The `before` and `after` keys contain the FEN of the position before and after
the move.

The `Move` object has helper methods that describe the type of move:

- `.isCapture()` - is the move a regular capture? NOTE: this is `false` for an
  en-passant capture
- `.isEnPassant()` - is the move an en-passant capture?
- `.isBigPawn()` - is the move a 2-rank pawn move?
- `.isPromotion()` - is the move a pawn promotion?
- `.isKingsideCastle()` - is the move a kingside castle?
- `.isQueensideCastle()` - is the move a queenside castle?

### .pgn([ options ])

Returns the game in PGN format. Options is an optional parameter which may
include max width and/or a newline character settings.

```ts
const chess = new Chess()
chess.setHeader('White', 'Plunky')
chess.setHeader('Black', 'Plinkie')
chess.move('e4')
chess.move('e5')
chess.move('Nc3')
chess.move('Nc6')

chess.pgn({ maxWidth: 5, newline: '<br />' })
// -> '[White "Plunky"]<br />[Black "Plinkie"]<br /><br />1. e4 e5<br />2. Nc3 Nc6'
```

### .put(piece, square)

Place a piece on the square where piece is an object with the form { type: ...,
color: ... }. Returns true if the piece was successfully placed, otherwise, the
board remains unchanged and false is returned. `put()` will fail when passed an
invalid piece or square, or when two or more kings of the same color are placed.

```ts
chess.clear()

chess.put({ type: PAWN, color: BLACK }, 'a5') // put a black pawn on a5
// -> true
chess.put({ type: 'k', color: 'w' }, 'h1') // shorthand
// -> true

chess.fen()
// -> '8/8/8/p7/8/8/8/7K w - - 0 0'

chess.put({ type: 'z', color: 'w' }, 'a1') // invalid piece
// -> false

chess.clear()

chess.put({ type: 'k', color: 'w' }, 'a1')
// -> true

chess.put({ type: 'k', color: 'w' }, 'h1') // fail - two kings
// -> false
```

### .remove(square)

Remove and return the piece on _square_. Returns `undefined` if the square is
already empty.

```ts
chess.clear()
chess.put({ type: PAWN, color: BLACK }, 'a5') // put a black pawn on a5
chess.put({ type: KING, color: WHITE }, 'h1') // put a white king on h1

chess.remove('a5')
// -> { type: 'p', color: 'b' },
chess.remove('h1')
// -> { type: 'k', color: 'w' },
chess.remove('e1')
// -> undefined
```

### .removeComment()

Delete and return the comment for the current position, if it exists.

```ts
const chess = new Chess()

chess.loadPgn('1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 {giuoco piano} *')

chess.getComment()
// -> "giuoco piano"

chess.removeComment()
// -> "giuoco piano"

chess.getComment()
// -> undefined
```

### .removeComments()

Delete and return comments for all positions.

```ts
const chess = new Chess()

chess.loadPgn(
  "1. e4 e5 {king's pawn opening} 2. Nf3 Nc6 3. Bc4 Bc5 {giuoco piano} *",
)

chess.removeComments()
// -> [
//     {
//       fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
//       comment: "king's pawn opening"
//     },
//     {
//       fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
//       comment: "giuoco piano"
//     }
//    ]

chess.getComments()
// -> []
```

### .removeHeader(field: string): boolean

Remove a field from the PGN header. Returns `true` if the header was removed,
else `false` as the header was not found.

```ts
chess.setHeader('White', 'Morphy')
chess.setHeader('Black', 'Anderssen')
chess.setHeader('Date', '1858-??-??')
chess.removeHeader('Date')
chess.getHeaders()
// -> { White: 'Morphy', Black: 'Anderssen'}
```

### .reset()

Reset the board to the initial starting position.

### .setCastlingRights(color, rights)

Sets the castling rights for the given color. Returns true if the change was
successfully made. False will be returned when the position doesn't allow the
requested change i.e. if the corresponding king or rook is not on it's starting
square.

```ts
// white can't castle kingside but can castle queenside
chess.setCastlingRights(WHITE, { [KING]: false, [QUEEN]: true })
```

### .setComment(comment)

Comment on the current position.

```ts
const chess = new Chess()

chess.move('e4')
chess.setComment("king's pawn opening")

chess.pgn()
// -> "1. e4 {king's pawn opening}"
```

### .setHeader(key: string, value: string): Record<string, string>

Set a header key/value pair to be added to the PGN output.

```ts
chess.setHeader('White', 'Robert James Fischer')
// { 'White': 'Robert James Fischer' }
chess.setHeader('Black', 'Mikhail Tal')
// { 'White': 'Robert James Fischer', 'Black': 'Mikhail Tal' }
```

### .setTurn(color)

Sets the side to move. If the color is changed it returns true, if the color
remains unchanged it returns false. If a player is in check, attempting to
change the color to turn will throw an exception.

```ts
chess.setTurn('b')
// -> true
chess.setTurn('b')
// -> false
```

### .squareColor(square)

Returns the color of the square ('light' or 'dark').

```ts
const chess = Chess()
chess.squareColor('h1')
// -> 'light'
chess.squareColor('a7')
// -> 'dark'
chess.squareColor('bogus square')
// -> null
```

### .turn()

Returns the current side to move.

```ts
chess.load('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1')
chess.turn()
// -> 'b'
```

### .undo()

Takeback the last half-move, returning a move object if successful, otherwise
null.

```ts
const chess = new Chess()

chess.fen()
// -> 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
chess.move('e4')
chess.fen()
// -> 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'

chess.undo()
//  {
//    color: 'w',
//    piece: 'p',
//    from: 'e2',
//    to: 'e4',
//    san: 'e4',
//    flags: 'b',
//    lan: 'e2e4',
//    before: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
//    after: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
//  }

chess.fen()
// -> 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
chess.undo()
// -> null
```

### validateFen(fen):

This static function returns a validation object specifying validity or the
errors found within the FEN string.

```ts
import { validateFen } from 'chess.js'

validateFen('2n1r3/p1k2pp1/B1p3b1/P7/5bP1/2N1B3/1P2KP2/2R5 b - - 4 25')
// -> { ok: true }

validateFen('4r3/8/X12XPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45')
// -> { ok: false,
//     error: '1st field (piece positions) is invalid [invalid piece].' }
```
