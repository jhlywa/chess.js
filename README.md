# chess.js

chess.js is a Javascript chess library that is used for chess move generation/validation,
piece placement/movement, and check/checkmate/stalemate detection - basically everything 
but the AI (don't worry, it's coming soon).

Using chess.js in a browser is straight-forward:
    
    <script type="text/javascript" src="chess.js"></script>
    <script type="text/javascript">

      var chess = new Chess();
      ...

    </script>

Using chess.js in node.js is equally easy:

    var ch = require('/chess.js')

    var chess = new ch.Chess();
    ...
## Example Code
The code below plays a complete game of chess ... randomly.

    var sys = require('sys'),
        ch =  require('./chess');

    var chess = new ch.Chess();

    while (!chess.in_checkmate() && !chess.in_draw()) {
      sys.puts('position: ' + chess.fen());
      var moves = chess.moves();
      var move = moves[Math.floor(Math.random() * moves.length)];
      chess.move(move);
      sys.puts('move: ' + move);
    }


## API

### Constructor: Chess([ fen ])
The Chess() constructor takes a optional parameter which specifies the board configuration
in [Forsyth-Edwards Notation](http://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation).

    // board defaults to the starting position when called with no parameters
    var chess = new Chess();

    // pass in a FEN string to load a particular position
    var chess = new Chess('r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19');
    


### .load(fen)
The board is cleared and the FEN string is loaded.  Returns true if position was
successfully loaded, otherwise false.

    chess.load('4r3/8/2p2PPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45');
    // -> true
    
    chess.load('4r3/8/X12XPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45');
    // -> false, bad piece X



### .fen()
Returns the FEN string for the current position.

    var chess = new Chess();

    // make some moves
    chess.move('e4');
    chess.move('e5');
    chess.move('f4');

    chess.fen();
    // -> 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2'



### .ascii()
Returns a string containing an ASCII diagram of the current position.

    var chess = new Chess();

    // make some moves
    chess.move('e4');
    chess.move('e5');
    chess.move('f4');

    chess.ascii();
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



### .clear()
Clears the board.

    chess.clear();
    chess.fen();
    // -> '8/8/8/8/8/8/8/8  - - 0 1' <- empty board



### .turn()
Returns the current side to move.

    chess.load('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1')
    chess.turn()
    // -> 'b'



### .put(piece_square)
Put a piece on square using the format piece@square (e.g. 'p@a5').  Lowercase
pieces are black, uppercase pieces are white.  Returns true if piece was
successfully placed, otherwise false.

    chess.clear();

    chess.put('p@a5');  // put a black pawn on a5
    // -> true
    chess.put('Q@e1');  // put a white queen on e1
    // -> true
    chess.put('X@e1');  // bad piece
    // -> false
    chess.put('n@p1');  // bad square
    // -> false

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
Attempts to make a move on the board, returning a move object if the move was
legal, otherwise null.  The .move function can be called in three ways, the
first with a move in Standard Algebraic Notation (SAN):

    var chess = new Chess();

    chess.move('Nf3') 
    // -> { from: 'g1', to: 'f3', flags: 'n', 
    //      new_piece: { type: 'n', color: 'w' }, 
    //      old_piece: { type: 'n', color: 'w' },
    //      san: 'Nf3' }

    chess.move('nf6') // SAN is case sensitive!!
    // -> null

    chess.move('Nf6')
    // -> { from: 'g8', to: 'f6', flags: 'n', 
    //      new_piece: { type: 'n', color: 'w' }, 
    //      old_piece: { type: 'n', color: 'w' },
    //      san: 'Nf6' }

.move() may also be called with two parameters, a 'from' square and a 'to' square:

    var chess = new Chess();

    chess.move('e2', 'e4');
    // -> { from: 'e2', to: 'e4', flags: 'b',
    //      new_piece: { type: 'p', color: 'w' },
    //      old_piece: { type: 'p', color: 'w' },
    //      san: 'e4' }

Finally, .move() may be called with a move object (no move validation is
performed when calling .move() in this manner):

    var chess = new Chess();

    chess.move({ from: 'd2', to: 'd4', flags: 'b',
                 new_piece: { type: 'p', color: 'w' },
                 old_piece: { type: 'p', color: 'w' },
                 san: 'd4' });
    // -> { from: 'd2', to: 'd4', flags: 'b',
    //      new_piece: { type: 'p', color: 'w' },
    //      old_piece: { type: 'p', color: 'w' },
    //      san: 'd4' }



### .undo()
Takeback the last half-move:
    
    var chess = new Chess();

    chess.fen();
    // -> 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    chess.move('e4');
    chess.fen();
    // -> 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'

    chess.undo();
    chess.fen();
    // -> 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'



### .moves([ options ])
Returns a list of all legal moves from the current position.  The function be passed a options hash which controls the verbosity of the return values (this may change in the future).

    var chess = new Chess();
    chess.moves();
    // -> ['a3', 'a4', 'b3', 'b4', 'c3', 'c4', 'd3', 'd4', 'e3', 'e4',
           'f3', 'f4', 'g3', 'g4', 'h3', 'h4', 'Na3', 'Nc3', 'Nf3', 'Nh3']

    chess.moves({ verbose: true });
    // -> [{ from: 'a2', 
             to: 'a3', 
             flags: '', 
             new_piece: { type: 'p', color: 'w' }, 
             old_piece: { type: 'p', color: 'w' },
             # a captured_piece key is included when the flags key contains the substring 'c'
             san: 'a3' },
           ...
           ]

The _flags_ field in verbose mode may contain one or more of the following values:

- 'b' - a pawn push of two squares
- 'e' - an en passant capture
- 'c' - a standard capture
- 'p' - a promotion 
- 'k' - kingside castling
- 'q' - queenside castling

A flag of 'pc' would mean that a pawn captured a piece on the 8th rank and promoted.



### .in_check() 
Returns true or false if the side to move is in check.

    var chess = new Chess('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3');
    chess.in_check();
    // -> true



### .in_checkmate() 
Returns true or false if the side to move has been checkmated.

    var chess = new Chess('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3');
    chess.in_checkmate();
    // -> true



### .in_draw() 
Returns true or false if the game is drawn.

    var chess = new Chess('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78')
    chess.in_draw();
    // -> true



### .in_stalemate() 
Returns true or false if the side to move has been stalemated.

    var chess = new Chess('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78')
    chess.in_stalemate();
    // -> true



## TODO

- add an optional promotion parameter to the move(from, to) method
- publicly expose constants (e.g. WHITE, BLACK, FLAGS SQUARES, etc...)
- undo move on board, instead of just pop()'ing a copy
- add draw detection for insufficient material and draw by repetition
- add method to generate PGN ([Portable Game Notation](http://en.wikipedia.org/wiki/Portable_Game_Notation)) output
- add AI (basic alpha-beta search w/ primitive position evaluation)
