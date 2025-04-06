import * as ChessJs from 'chess.js'
import { Chess, VerboseMove } from 'chess.js';

let chess = new ChessJs.Chess()

console.log(chess.ascii())

chess = new ChessJs.Chess('r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19')

console.log(chess.ascii())

console.log('clear the board')
chess.clear()
console.log(chess.ascii())
console.log(chess.fen())
console.log('Game over: ', chess.game_over())

chess = new ChessJs.Chess()

console.log(chess.fen())
console.log('Game over: ', chess.game_over())

chess.move('e4')
chess.move('e5')
chess.move('f4')
chess.move('exf4')

console.log()
console.log('history: ', chess.history())

console.log('verbose history:')
const verboseHistory = chess.history({ verbose: true }) as ChessJs.VerboseMove[]
console.log('[3] color     :', verboseHistory[3].color)
console.log('[3] from      :', verboseHistory[3].from)
console.log('[3] to        :', verboseHistory[3].to)
console.log('[3] piece     :', verboseHistory[3].piece)
console.log('[3] promotion :', verboseHistory[3].promotion)
console.log('[3] san       :', verboseHistory[3].san)
console.log('[3] flags     :', verboseHistory[3].flags)

console.log()
console.log('in_check: ', chess.in_check())
console.log('in_checkmate: ', chess.in_checkmate())
console.log('in_draw: ', chess.in_draw())
console.log('in_stalemate: ', chess.in_stalemate())
console.log('in_threefold_repetition: ', chess.in_threefold_repetition())

console.log()
chess.header('White', 'Test')
console.log('header: ', chess.header())

console.log()
chess = new ChessJs.Chess('k7/8/n7/8/8/8/8/7K b - - 0 1');
console.log('insufficient_material: ', chess.insufficient_material())

console.log()
console.log('Load valid fen: ', chess.load('4r3/8/2p2PPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45'))
console.log('Load invalid fen: ', chess.load('4r3/8/X12XPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45'))

console.log()
console.log('Load PGN: ', chess.load_pgn('[Event "Casual"]\n1. e4 e5 *'))
console.log(chess.ascii())

console.log()
console.log('Load PGN: ', chess.load_pgn('[Event "Casual"]|1. e2-e4 e5 *', {newline_char: '\\|', sloppy: true}))
console.log(chess.ascii())

console.log()
chess = new ChessJs.Chess()
console.log('move: ', chess.move('e4'))
console.log('move: ', chess.move('nf6'))
console.log('move: ', (chess.move('Nf6') as ChessJs.VerboseMove).flags)
console.log(chess.ascii())

console.log()
chess = new ChessJs.Chess()
console.log('move: ', chess.move({from: 'e2', to: 'e4'}))
console.log(chess.ascii())

console.log()
chess = new ChessJs.Chess('r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7')
console.log('move: ', chess.move('Nge7'))
console.log('move: ', chess.move('Nge7', {sloppy: true}))
console.log(chess.ascii())

console.log()
chess = new Chess()
console.log('possible moves: ', chess.moves().join(' '))
console.log('possible moves from square: ', chess.moves({square: 'e2'}).join(' '))
console.log('possible moves verbose: ', (chess.moves({verbose: true}) as VerboseMove[])[0].san)

console.log()
chess = new ChessJs.Chess()
chess.header('White', 'Plunky', 'Black', 'Plinkie')
chess.move('e4')
chess.move('e5')
chess.move('Nc3')
chess.move('Nc6')
console.log('PGN: ')
console.log(chess.pgn())

console.log()
chess.clear()
console.log('put: ', chess.put({type: 'p', color: 'b'}, 'a5'))
console.log(chess.fen())
console.log('remove: ', chess.remove('a5'))

console.log()
chess.reset()
console.log(chess.fen())

console.log()
console.log('Square color: ', 'a1 ', chess.square_color('a1') == 'dark')
console.log('Square color: ', 'h1 ', chess.square_color('h1') == 'light')

console.log()
chess = new ChessJs.Chess()
console.log(chess.fen())
console.log('turn w: ', chess.turn() == 'w')
chess.move('e4')
console.log('turn b: ', chess.turn() == 'b')

console.log()
chess = new ChessJs.Chess()
chess.move('e4')
console.log(chess.fen())
console.log('Undo: ', chess.undo())
console.log(chess.fen())

console.log()
console.log('validate_fen valid: ', chess.validate_fen('4r3/8/X12XPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45').valid)
console.log('validate_fen error_number: ', chess.validate_fen('4r3/8/X12XPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45').error_number)
console.log('validate_fen error: ', chess.validate_fen('4r3/8/X12XPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45').error)
