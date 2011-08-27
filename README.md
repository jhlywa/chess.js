# chess.js

chess.js is a Javascript chess library that is used for chess move generation/validation,
piece placement/movement, and check/checkmate/stalemate detection - basically everything
but the AI.

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

    while (!chess.game_over()) {
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
    // -> '8/8/8/8/8/8/8/8 w - - 0 1' <- empty board

### .fen()
Returns the FEN string for the current position.

    var chess = new Chess();

    // make some moves
    chess.move('e4');
    chess.move('e5');
    chess.move('f4');

    chess.fen();
    // -> 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2'

### .game_over() 
Returns true or false if the game has ended via checkmate, stalemate, or draw.

    var chess = new Chess();
    chess.game_over();
    // -> false

    chess.load('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78');
    chess.game_over();
    // -> true (stalemate)

    chess.load('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3');
    chess.game_over();
    // -> true (checkmate)

### .get(square)
Returns the piece on the square:

    chess.clear();
    chess.put({ type: chess.PAWN, color: chess.BLACK }, 'a5') // put a black pawn on a5

    chess.get('a5');
    // -> { type: 'p', color: 'b' },
    chess.get('a6');
    // -> null

### .history([ options ])
Returns a list containing the moves of the current game.  Options is an optional
parameter which may contain a 'verbose' flag.  See .moves() for a description of the
verbose move fields.

    var chess = new Chess();
    chess.move('e4');
    chess.move('e5');
    chess.move('f4');
    chess.move('exf4');
    
    chess.history();
    // -> ['e4', 'e5', 'f4', 'exf4']

    chess.history({ verbose: true });
    // -> [{ color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
    //     { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
    //     { color: 'w', from: 'f2', to: 'f4', flags: 'b', piece: 'p', san: 'f4' },
    //     { color: 'b', from: 'e5', to: 'f4', flags: 'c', piece: 'p', captured: 'p', san: 'exf4' }]

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
Returns true or false if the game is drawn (50-move rule or insufficient material).

    var chess = new Chess('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78');
    chess.in_draw();
    // -> true

### .in_stalemate() 
Returns true or false if the side to move has been stalemated.

    var chess = new Chess('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78');
    chess.in_stalemate();
    // -> true

### .in_threefold_repetition() 
Returns true or false if the current board position has occurred three or more
times.

    var chess = new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    // -> true
    // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq occurs 1st time
    chess.in_threefold_repetition();
    // -> false

    chess.move('Nf3'); chess.move('Nf6') chess.move('Ng1'); chess.move('Ng8');
    // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq occurs 2nd time
    chess.in_threefold_repetition();
    // -> false

    chess.move('Nf3'); chess.move('Nf6') chess.move('Ng1'); chess.move('Ng8');
    // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq occurs 3rd time
    chess.in_threefold_repetition();
    // -> true

### .header()
Allows header information to be added to PGN output. Any number of key/value
pairs can be passed to .header().

    chess.header('White', 'Robert James Fischer');
    chess.header('Black', 'Mikhail Tal');

    // or

    chess.header('White', 'Morphy', 'Black', 'Anderssen', 'Date', '1858-??-??');

### .insufficient_material() 
Returns true if the game is drawn due to insufficient material (K vs. K,
K vs. KB, or K vs. KN); otherwise false.

    var chess = new Chess('k7/8/n7/8/8/8/8/7K b - - 0 1');
    chess.insufficient_material()
    // -> true

### .load(fen)
The board is cleared and the FEN string is loaded.  Returns true if position was
successfully loaded, otherwise false.

    var chess = new Chess();
    chess.load('4r3/8/2p2PPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45');
    // -> true
    
    chess.load('4r3/8/X12XPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45');
    // -> false, bad piece X

### .load_pgn(pgn, [ options ])
Load the moves of a game stored in 
[Portal Game Notation](http://en.wikipedia.org/wiki/Portable_Game_Notation).
Options is a optional parameter that contains a 'newline_char' denoting the line
delimiter (the default delimiter is '\n').  Returns true if the PGN was parsed
successfully, otherwise false.

    var chess = new Chess();
    pgn = ['[Event "Casual Game"]',
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
           '23.Bd7+ Kf8 24.Bxe7# 1-0'];

    chess.load_pgn(pgn.join('\n'));
    // -> true

    chess.fen()
    // -> 1r3kr1/pbpBBp1p/1b3P2/8/8/2P2q2/P4PPP/3R2K1 b - - 0 24

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

### .move(move)
Attempts to make a move on the board, returning a move object if the move was
legal, otherwise null.  The .move function can be called two ways, by passing
a string in Standard Algebraic Notation (SAN):

    var chess = new Chess();

    chess.move('e4') 
    // -> { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e2' }

    chess.move('nf6') // SAN is case sensitive!!
    // -> null

    chess.move('Nf6')
    // -> { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' }

Or by passing .move() a move object (only the 'to', 'from', and when necessary
'promotion', fields are needed):

    var chess = new Chess();

    chess.move({ from: 'g2', to: 'g3' });
    // -> { color: 'w', from: 'g2', to: 'g3', flags: 'n', piece: 'p', san: 'g3' }

### .moves([ options ])
Returns a list of all legal moves from the current position.  The function be passed a options hash which controls the verbosity of the return values (this may change in the future).

    var chess = new Chess();
    chess.moves();
    // -> ['a3', 'a4', 'b3', 'b4', 'c3', 'c4', 'd3', 'd4', 'e3', 'e4',
           'f3', 'f4', 'g3', 'g4', 'h3', 'h4', 'Na3', 'Nc3', 'Nf3', 'Nh3']

    chess.moves({ verbose: true });
    // -> [{ color: 'w', from: 'a2', to: 'a3', 
             flags: 'n', piece: 'p', san 'a3'
             # a captured: key is included when the move is a capture
             # a promotion: key is included when the move is a promotion
           },
           ...
           ]

The _piece_, _captured_, and _promotion_ fields contain the lowercase
representation of the applicable piece.

The _flags_ field in verbose mode may contain one or more of the following values:

- 'n' - a non-capture
- 'b' - a pawn push of two squares
- 'e' - an en passant capture
- 'c' - a standard capture
- 'p' - a promotion 
- 'k' - kingside castling
- 'q' - queenside castling

A flag of 'pc' would mean that a pawn captured a piece on the 8th rank and promoted.

### .pgn([ options ])
Returns the game in PGN format. Options is an optional parameter which may include
max width and/or a newline character settings.

    var chess = new Chess();
    chess.info('White', 'Plunky', 'Black', 'Plinkie');
    chess.move('e4');
    chess.move('e5');
    chess.move('Nc3');
    chess.move('Nc6');

    chess.pgn({ max_width: 5, newline_char: '<br />' });
    // -> '[White "Plunky"]<br />[Black "Plinkie"]<br /><br />1. e4 e5<br />2. Nc3 Nc6'

### .put(piece, square)
Place a piece on square where piece is an object with the form
{ type: ..., color: ... }.  Returns true if piece was successfully placed,
otherwise false.

    chess.clear();

    chess.put({ type: chess.PAWN, color: chess.BLACK }, 'a5') // put a black pawn on a5
    // -> true
    chess.put({ type: 'k', color: 'w' }, 'h1') // shorthand
    // -> true

    chess.fen();
    // -> '8/8/8/p7/8/8/8/7K w - - 0 0'

### .remove(square)
Remove and return the piece on _square_.

    chess.clear();
    chess.put({ type: chess.PAWN, color: chess.BLACK }, 'a5') // put a black pawn on a5
    chess.put({ type: chess.KING, color: chess.WHITE }, 'h1') // put a white king on h1

    chess.remove('a5');
    // -> { type: 'p', color: 'b' },
    chess.remove('h1');
    // -> { type: 'k', color: 'w' },
    chess.remove('e1');
    // -> null

### .reset()
Reset the board to the initial starting position.

### .square_color(square)
Returns the color of the square ('light' or 'dark').

    var chess = Chess();
    chess.square_color('h1')
    // -> 'light'
    chess.square_color('a7')
    // -> 'dark'
    chess.square_color('bogus square')
    // -> null

### .turn()
Returns the current side to move.

    chess.load('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1')
    chess.turn()
    // -> 'b'

### .undo()
Takeback the last half-move, returning a move object if successful, otherwise null.
    
    var chess = new Chess();

    chess.fen();
    // -> 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    chess.move('e4');
    chess.fen();
    // -> 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'

    chess.undo();
    // -> { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' }
    chess.fen();
    // -> 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
    chess.undo();
    // -> null

### .validate_fen(fen):
Returns a validation object specifying validity or the errors found within the
FEN string.

    chess.validate_fen('2n1r3/p1k2pp1/B1p3b1/P7/5bP1/2N1B3/1P2KP2/2R5 b - - 4 25');
    // -> { valid: true, error_number: 0, error: 'No errors.' }

    chess.validate_fen('4r3/8/X12XPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45');
    // -> { valid: false, error_number: 9,
    //     error: '1st field (piece positions) is invalid [invalid piece].' }



## CONTRIBUTORS

Special thanks to the following developers for their patches and contributions:

- [Steve Bragg](https://github.com/2sb18)
- [E. Azer Koçulu](https://github.com/azer)
- [Falco Nogatz](https://github.com/fnogatz)

Musical support provided by:

- [The Grateful Dead](http://www.youtube.com/watch?v=YLzUme1gN8c)
- [Umphrey's McGee](http://www.youtube.com/watch?v=jh-1fFWkSdw)



## BUGS

- the en passant square and castling flags aren't adjusted when using the put/remove functions (workaround: use .load() instead)



## TODO

- add AI (basic alpha-beta search w/ primitive position evaluation)
- add jQuery chessboard widget
- investigate the use of piece lists (this may shave a few cycles off generate_moves() and attacked())
