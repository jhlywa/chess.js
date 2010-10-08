# chess.js

chess.js is a Javascript chess library that is used for chess move generation/validation,
piece placement/movement, and check/checkmate/stalemate detection - basically everything 
but the AI.  It uses an [0x88 board representation](http://chessprogramming.wikispaces.com/0x88)
internally to limit the number of conditionals branches during move generation.

Using chess.js in a browser is straight-forward:
    
    <script type="text/javascript" src="chess.js"></script>
    <script type="text/javascript">

      var chess = new Chess();
      ...

    </script>

Using chess.js in node.js is equally easy:

    var cl = require('/chess.js')

    var chess = new cl.Chess();
    ...

  
## API

### Constructor: Chess([ fen ])
The Chess() constructor takes a optional parameter which specifies the board configuration
in [Forsyth-Edwards Notation](http://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation).

    // board defaults to the starting position when called with no parameters
    var chess = new Chess();

    // pass in a FEN string to load a particular position
    var chess = new Chess('r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19');
    

### .load(fen)
The board is cleared and the FEN string is loaded.

    chess.load('4r3/8/2p2PPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45');


### .fen
Returns the FEN string for the current position.

    var chess = new Chess();

    // make some moves
    chess.move('e4');
    chess.move('e5');
    chess.move('f4');

    chess.fen();
    \\ -> 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2'



### .turn
Returns the current side to move.

    chess.load('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1')
    chess.turn()
    // -> 'b'


### .clear
Clears the board.

    chess.clear();
    chess.fen();
    \\ -> '8/8/8/8/8/8/8/8  - - 0 0' <- empty board


### .put(piece_square)
Put a piece on square.  Lowercase pieces are black, uppercase pieces are white.

    chess.clear();
    chess.put('p@a5');  // put a black pawn on a5
    chess.put('Q@e1');  // put a white queen on e1

    chess.fen();
    // -> '8/8/8/p7/8/8/8/4Q3  - - 0 0'


### .get(square)
Returns the piece on the square:

    chess.clear();
    chess.put('p@a5');  // put a black pawn on a5
    chess.put('Q@e1');  // put a white queen on e1

    chess.get('a5');
    // -> 'p'
    chess.get('e1');
    // -> 'Q'
    chess.get('a6');
    // -> null


### .move(move, [ to ])
Attempts to make a move on the board,  returning true if the move was legal, otherwise
false.  The .move function can be called in two ways, the first with a move in 
Standard Algebraic Notation (SAN):

    var chess = new Chess();

    chess.move('Nf3') 
    \\ -> true

    chess.move('nf6') // SAN is case sensitive!!
    \\ -> false

    chess.move('Nf6')
    \\ -> true

.move may also be called with two parameters, a from square and a to square:

    var chess = new Chess();

    chess.move('g1', 'f3');
    \\ -> true


### .undo()
Takeback the last half-move:
    
    var chess = new Chess();

    chess.fen();
    \\ -> 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    chess.move('e4');
    chess.fen();
    \\ -> 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'

    chess.undo();
    chess.fen();
    \\ -> 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'


### .moves([ options ])
Returns a list of all legal moves from the current position.  The function be passed a options hash which controls the verbosity of the return values (this may change in the future).

    var chess = new Chess();
    chess.moves();
    \\ -> ['a3', 'a4', 'b3', 'b4', 'c3', 'c4', 'd3', 'd4', 'e3', 'e4', 'f3', 'f4', 'g3', 'g4', 'h3', 'h4', 'Na3', 'Nc3', 'Nf3', 'Nh3']

    chess.moves({verbose:true});
    \\ -> [{from: 'a2', to: 'a3', flags: '', new_piece: {type: 'p', color: 'w'}, old_piece: {type: 'p', color: 'w'}, captured_piece: undefined, san: 'a3'},,
           {from: 'a2', to: 'a4', flags: 'b', new_piece: {type: 'p', color: 'w'}, old_piece: {type: 'p', color: 'w'}, captured_piece: undefined, san: 'a4'},
           ...
           {from: 'g1', to: 'h3', flags: '', new_piece: {type: 'n', color: 'w'}, old_piece: {type: 'n', color: 'w'}, captured_piece: undefined, san: 'Nh3'},
           }]

The _flags_ field in verbose mode may contain one or more of the following values:

- 'b' - a pawn push of two squares
- 'e' - a en passant capture
- 'c' - a standard capture
- 'p' - a promotion 
- 'k' - kingside castling
- 'q' - queenside castling

A flag of 'pc' would mean that a pawn captured a piece on the 8th rank and promoted.


### .in_check() 
Returns true or false if the side to move is in check.

    var chess = new Chess('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3');
    chess.in_check();
    \\ -> true


### .in_checkmate() 
Returns true or false if the side to move has been checkmated.

    var chess = new Chess('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3');
    chess.in_checkmate();
    \\ -> true


### .in_stalemate() 
Returns true or false if the side to move has been stalemated.

    var chess = new Chess('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78')
    chess.in_stalemate();
    \\ -> true

## TODO

- add draw detection for insufficient material, draw by repetition, and 50-move rule.
- add method to generate PGN ([Portable Game Notation](http://en.wikipedia.org/wiki/Portable_Game_Notation)] output
