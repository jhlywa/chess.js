/* 
 * Copyright (c) 2010, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *---------------------------------------------------------------------------*/

var Chess = function(fen) {

  var BLACK = 'b';
  var WHITE = 'w';

  var EMPTY = -1;

  var PAWN = 'p';
  var KNIGHT = 'n';
  var BISHOP = 'b';
  var ROOK = 'r';
  var QUEEN = 'q';
  var KING = 'k';

  var PAWN_OFFSETS = {
    b: [16, 32, 17, 15],
    w: [-16, -32, -17, -15],
  };

  var PIECE_OFFSETS = {
    n: [-18, -33, -31, -14,  18, 33, 31,  14], 
    b: [-17, -15,  17,  15], 
    r: [-16,   1,  16,  -1], 
    q: [-17, -16, -15,   1,  17, 16, 15,  -1], 
    k: [-17, -16, -15,   1,  17, 16, 15,  -1],
  }

  var ATTACKS = [
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
  ];

  var RAYS = [
     17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
      0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
      0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
      0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
      0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
      1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
      0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
      0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
      0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
      0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
    -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
  ];

  var SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 }

  var FLAGS = {
    NORMAL: 'n',
    CAPTURE: 'c',
    BIG_PAWN: 'b',
    EP_CAPTURE: 'e',
    PROMOTION: 'p',
    KSIDE_CASTLE: 'k',
    QSIDE_CASTLE: 'q'
  };

  var RANK_1 = 7;
  var RANK_2 = 6;
  var RANK_3 = 5;
  var RANK_4 = 4;
  var RANK_5 = 3;
  var RANK_6 = 2;
  var RANK_7 = 1;
  var RANK_8 = 0;

  var SQUARES = {
    a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
    a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
    a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
    a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
    a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
    a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
    a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
  };

  var ROOKS = {
    w: [{square: SQUARES.a1, flag: FLAGS.QSIDE_CASTLE},
        {square: SQUARES.h1, flag: FLAGS.KSIDE_CASTLE}],
    b: [{square: SQUARES.a8, flag: FLAGS.QSIDE_CASTLE},
        {square: SQUARES.h8, flag: FLAGS.KSIDE_CASTLE}],
  };


  var board = new Array(128);
  var kings = {w: EMPTY, b: EMPTY};
  var turn = '';
  var castling = {w: '', b: ''};
  var ep_square = EMPTY;
  var half_moves = 0;
  var move_number = 1;
  var history = [];

  /* if the user passes in a fen string, load it, else default to 
   * starting position
   */
  if (typeof(fen) == 'undefined') {
    load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  } else {
    load(fen);
  }

  function clear() {
    board = new Array(128);
    kings = {w: EMPTY, b: EMPTY};
    turn = '';
    castling = {w: '', b: ''};
    ep_square = EMPTY;
    half_moves = 0;
    move_number = 1;
    history = [];
  }

  function load(fen) {
    var tokens = fen.split(' ');
    var position = tokens[0];
    var square = 0;

    clear();

    for (var i = 0; i < position.length; i++) {
      var piece = position.charAt(i);

      if (piece == '/') {
        square += 8;
      } else if (is_digit(piece)) {
        square += parseInt(piece, 10); 
      } else {
        var color = (piece < 'a') ? WHITE : BLACK;
        piece = piece.toLowerCase();
        board[square] = {type: piece, color: color}; 

        if (piece == KING) {
          kings[color] = square;
        }

        square++;
      }
    }

    turn = tokens[1];

    if (tokens[2].indexOf('K') > -1) {
      castling.w += FLAGS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('Q') > -1) {
      castling.w += FLAGS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf('k') > -1) {
      castling.b += FLAGS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('q') > -1) {
      castling.b += FLAGS.QSIDE_CASTLE;
    }

    ep_square = (tokens[3] == '-') ? -1 : square_num(tokens[3]);
    half_moves = parseInt(tokens[4], 10);
    move_number = parseInt(tokens[5], 10);
  }

  function generate_fen() {
    var empty = 0;
    var fen = '';

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        } 
        var color = board[i].color;
        var piece = board[i].type;

        fen += (color == WHITE) ? 
                 piece.toUpperCase() : piece.toLowerCase();
      }

      if ((i + 1) & 0x88) {
        if (empty > 0) {
          fen += empty;
        }

        if (i != SQUARES.h1) {
          fen += '/';
        }

        empty = 0;
        i += 8;
      }
    }

    var cflags = castling.w.toUpperCase() + castling.b.toLowerCase() || '-';
    var epflags = (ep_square == EMPTY) ? '-' : algebraic(ep_square);

    return [fen, turn, cflags, epflags, half_moves, move_number].join(' ')
  }

  function get(square) {
    var piece = board[SQUARES[square]];
    return (piece == null) ? null
            : (piece.color == WHITE) ?
               piece.type.toUpperCase() : piece.type.toLowerCase();
  }

  function put(piece_square) {
    var data = piece_square.split('@');
    var piece = data[0];
    var square = SQUARES[data[1]];
    var color = (piece < 'a') ? WHITE : BLACK;
    board[square] = {type: piece, color: color};
    if (piece.toLowerCase() == KING) {
      kings[color] = square;
    }
  }

  function generate_moves(settings) {

    function add_move(board, moves, from, to, flags) {
      /* if pawn promotion */
      if (board[from].type == PAWN && 
         (rank(to) == RANK_8 || rank(to) == RANK_1)) {
          var pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
          for (var i = 0; i < pieces.length; i++) {
            var promotion = {
              from: from,
              to: to,
              flags: flags + FLAGS.PROMOTION,
              new_piece: {type: pieces[i], color: board[from].color},
              old_piece: board[from],
              captured_piece: board[to],
            };
            moves.push(promotion);
          }
      } else {
        var move = {
          from: from,
          to: to,
          flags: flags,
          new_piece: board[from],
          old_piece: board[from],
          captured_piece: board[to],
        };

        moves.push(move);
      }
    }

    var moves = [];
    var us = turn;
    var them = swap_color(us);
    var second_rank = {b: RANK_7, w: RANK_2};

    for (var i = 0; i < board.length; i++) {
      piece = board[i];
      if (piece == null || piece.color != us) {
        continue;
      }

      if (piece.type == PAWN) { 
        /* single square, non-capturing */
        var square = i + PAWN_OFFSETS[us][0]; 
        if (board[square] == null) {
            add_move(board, moves, i, square, FLAGS.NORMAL);

          /* double square */
          var square = i + PAWN_OFFSETS[us][1]; 
          if (second_rank[us] == rank(i) && board[square] == null) {
            add_move(board, moves, i, square, FLAGS.BIG_PAWN);
          }
        }
        
        /* pawn captures */
        for (j = 2; j < 4; j++) {
          var square = i + PAWN_OFFSETS[us][j];
          if (square & 0x88) continue;

          if (board[square] != null && 
              board[square].color == them) {
              add_move(board, moves, i, square, FLAGS.CAPTURE);
          } else if (square == ep_square) {
              add_move(board, moves, i, ep_square, FLAGS.EP_CAPTURE);
          }
        }
      } else {
        for (var j = 0; j < PIECE_OFFSETS[piece.type].length; j++) {
          var offset = PIECE_OFFSETS[piece.type][j];
          var square = i;

          while (true) {
            square += offset;
            if (square & 0x88) break;

            if (board[square] == null) {
              add_move(board, moves, i, square, FLAGS.NORMAL);
            } else {
              if (board[square].color == us) break;
              add_move(board, moves, i, square, FLAGS.CAPTURE);
              break;
            }

            /* break, if knight or king */
            if (piece.type == 'n' || piece.type == 'k') break;
          }
        }
      }
    }

    /* king-side castling */
    if (castling[us].indexOf(FLAGS.KSIDE_CASTLE) > -1) {
      var castling_from = kings[us];
      var castling_to = castling_from + 2;

      if (board[castling_from + 1] == null &&
          board[castling_to]       == null &&
          !attacked(them, kings[us]) &&
          !attacked(them, castling_from + 1) &&
          !attacked(them, castling_to)) {
        add_move(board, moves, kings[us] , castling_to, 
                 FLAGS.KSIDE_CASTLE);
      }
    }

    /* queen-side castling */
    if (castling[us].indexOf(FLAGS.QSIDE_CASTLE) > -1) {
      var castling_from = kings[us];
      var castling_to = castling_from - 2;

      if (board[castling_from - 1] == null &&
          board[castling_from - 2] == null &&
          board[castling_from - 3] == null &&
          !attacked(them, kings[us]) &&
          !attacked(them, castling_from - 1) &&
          !attacked(them, castling_to)) {
        add_move(board, moves, kings[us], castling_to, 
                 FLAGS.QSIDE_CASTLE);
      }
    }

    /* if no parameters passed in, assume legal w/ algebraic moves */
    if (typeof(settings) == 'undefined') {
      settings = {legal: true};
    }

    /* return all pseudo-legal moves (this includes moves that allow the king 
     * to be captured
     */
    if (settings.legal != null && settings.legal == false) {
      return moves;
    }

    /* filter out illegal moves */
    var legal_moves = [];
    for (var i = 0; i < moves.length; i++) {
      make_move(moves[i]);
      if (!king_attacked(us)) {
        legal_moves.push(moves[i]);
      }
      undo_move();
    }

    return legal_moves;
  }

  /* convert a move from 0x88 coordinates to Standard Algebraic Notation (SAN) */
  function move_to_san(move) {
    var output = '';

    if (move.flags.indexOf(FLAGS.KSIDE_CASTLE) > -1) {
      output = 'O-O';
    } else if (move.flags.indexOf(FLAGS.QSIDE_CASTLE) > -1) {
      output = 'O-O-O';
    } else {
      var disambiguator = get_disambiguator(move);

      if (move.old_piece.type != PAWN) {
        output += move.old_piece.type.toUpperCase() + disambiguator;
      }

      if (move.flags.indexOf(FLAGS.CAPTURE) > -1 ||
          move.flags.indexOf(FLAGS.EP_CAPTURE) > -1) {
        if (move.old_piece.type == PAWN) {
          output += algebraic(move.from)[0];
        }
        output += 'x';    
      }

      output += algebraic(move.to);

      if (move.flags.indexOf(FLAGS.PROMOTION) > -1) {
        output += '=' + move.new_piece.type.toUpperCase();
      }
    }

    make_move(move);
    if (in_check()) {
      if (in_checkmate()) {
        output += '#';
      } else {
        output += '+';
      }
    }
    undo_move();

    return output;
  }



  function attacked(color, square) {
    for (var i = 0; i < board.length; i++) {
      if (i & 0x88) { i += 7; continue; }

      /* if empty square or wrong color */
      if (board[i] == null || board[i].color != color) continue;

      var piece = board[i];
      var difference = i - square;
      var index = difference + 119;
    
      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
        if (piece.type == PAWN) {
          if (difference > 0) {
            if (piece.color == WHITE) return true;
          } else {
            if (piece.color == BLACK) return true;
          }                 
          continue; 
        }       

        /* if the piece is a knight or a king */
        if (piece.type == 'n' || piece.type == 'k') return true;

        var offset = RAYS[index];
        var j = i + offset;

        var blocked = false;
        while (j != square) {           
          if (board[j] != null) { blocked = true; break; }   
          j += offset;
        }

        if (!blocked) return true;
      }
    }

    return false;
  }



  function king_attacked(color) {
    return attacked(swap_color(color), kings[color]);
  }

  function in_check() {
    return king_attacked(turn);
  }

  function in_checkmate() {
    if (!in_check()) {
      return false;
    }

    var moves = generate_moves();
    return moves.length == 0;
  }

  function in_stalemate() {
    if (in_check()) {
      return false;
    }

    var moves = generate_moves();
    return moves.length == 0;
  }

  function in_draw() {
    return (half_moves >= 100 || in_stalemate());
  }

  function push() {
    history.push({
      board: board.slice(),
      kings: {b: kings.b, w: kings.w},
      turn: turn,
      castling: {b: castling.b, w: castling.w},
      ep_square: ep_square,
      half_moves: half_moves,
      move_number: move_number,
      history: history.slice()
    });
  }

  function make_move(move) {
    var them = swap_color(turn);
    push();

    board[move.to] = board[move.from];
    board[move.from] = null;

    /* if ep capture, remove the captured pawn */
    if (move.flags.indexOf(FLAGS.EP_CAPTURE) > -1) {
      if (turn == 'b') {
        board[move.to - 16] = null;
      } else {
        board[move.to + 16] = null;
      }
    }

    /* if pawn promotion, replace with new piece */
    if (move.flags.indexOf(FLAGS.PROMOTION) > -1) {
      board[move.to] = move.new_piece;
    }

    /* if we moved the king */
    if (board[move.to].type == KING) {
      kings[board[move.to].color] = move.to;
      
      /* if we castled, move the rook next to the king */
      if (move.flags.indexOf(FLAGS.KSIDE_CASTLE) > -1) {
        var castling_to = move.to - 1;
        var castling_from = move.to + 1;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      } else if (move.flags.indexOf(FLAGS.QSIDE_CASTLE) > -1) {
        var castling_to = move.to + 1;
        var castling_from = move.to - 2;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      }
        
      /* turn off castling */
      castling[turn] = '';
    }

    /* turn off castling if we move a rook */
    if (castling[turn] != '') {

      for (var i = 0; i < ROOKS[turn].length; i++) {
        if (move.from == ROOKS[turn][i].square) {
          castling[turn] = 
            castling[turn].replace(ROOKS[turn][i].flag, '');
          break;
        }
      }
    }

    /* turn off castling if we capture a rook */
    if (castling[them] != '') {
      for (var i = 0; i < ROOKS[them].length; i++) {
        if (move.to == ROOKS[them][i].square) {
          castling[them] = 
            castling[them].replace(ROOKS[them][i].flag, '');
          break;
        }
      }
    }

    /* if big pawn move, update the en passant square */
    if (move.flags.indexOf(FLAGS.BIG_PAWN) > -1) {
      if (turn == 'b') {
        ep_square = move.to - 16;
      } else { 
        ep_square = move.to + 16;
      }
    } else {
      ep_square = EMPTY;
    }

    /* reset the 50 move counter if a pawn is moved or a piece is captured */
    if (move.old_piece.type == PAWN) {
      half_moves = 0;
    } else if (move.flags.indexOf(FLAGS.CAPTURE) > -1 || move.flags.indexOf(FLAGS.EP_CAPTURE) > -1) {
      half_moves = 0;
    } else {
      half_moves++;
    }

    if (turn == BLACK) {
      move_number++;
    }
    turn = swap_color(turn);

    return true;
  }

  function undo_move() {
    old = history.pop();
    board = old.board;
    kings = old.kings;
    turn = old.turn;
    castling = old.castling;
    ep_square = old.ep_square;
    half_moves = old.half_moves;
    move_number = old.move_number;
    history = old.history;
  }

  /* this function is used to uniquely identify ambiguous moves */ 
  function get_disambiguator(move) {
    moves = generate_moves();

    var from = move.from;
    var to = move.to;
    var piece = move.old_piece;

    var ambiguities = 0;
    var same_rank = 0;
    var same_file = 0;

    for (var i = 0; i < moves.length; i++) {
      var ambig_from = moves[i].from;
      var ambig_to = moves[i].to;
      var ambig_piece = moves[i].old_piece;

      /* if a move of the same piece type ends on the same to square, we'll 
       * need to add a disambiguator to the algebraic notation
       */
      if (piece.type == ambig_piece.type && from != ambig_from && to == ambig_to) {
        ambiguities++;

        if (rank(from) == rank(ambig_from)) { 
          same_rank++;
        }

        if (file(from) == file(ambig_from)) { 
          same_file++;
        }
      }
    }

    if (ambiguities > 0) {
      /* if there exists a similar moving piece on the same rank and file as
       * the move in question, use the square as the disambiguator
       */
      if (same_rank > 0 && same_file > 0) {
        return algebraic(from);
      } 
      /* if the moving piece rests on the same file, use the rank symbol as the 
       * disambiguator
       */
      else if (same_file > 0) {
        return algebraic(from).charAt(1);
      } 
      /* else use the file symbol */
      else {
        return algebraic(from).charAt(0);
      }
    }

    return '';
  }


  /******************************************************************************
   * UTILIY FUNCTIONS
   *****************************************************************************/
  function rank(i) {
    return i >> 4;
  }

  function file(i) {
    return i & 15;
  }

  function algebraic(i) {
    return 'abcdefgh'[file(i)] + '87654321'[rank(i)];
  }

  function swap_color(c) {
    return c == WHITE ? BLACK : WHITE;
  }

  function is_digit(c) {
    return '0123456789'.indexOf(c) != -1
  }

  function square_num(s) {
    return ((8 - parseInt(s[1], 10)) * 16) + (s.charCodeAt(0) - 97)
  }



  /******************************************************************************
   * DEBUGGING UTILITIES
   *****************************************************************************/
  function perft(depth) {
    var moves = generate_moves({legal: false})
    var nodes = 0;
    var color = turn;

    for (var i = 0; i < moves.length; i++) {
      make_move(moves[i]);
      if (!king_attacked(color)) {
        if (depth - 1 > 0) {
          var child_nodes = perft(depth - 1);
          nodes += child_nodes;
          //console.log(depth + '-' + i + ' ' + algebraic(moves[i].from) + '-' +
          //            algebraic(moves[i].to) + ', ' +
          //            moves[i].new_piece.type + ' = ' + child_nodes);
        } else {
          nodes++;
        }
      }
      undo_move();
    }

    return nodes;
  }

  return {
    load: function(fen) {
      return load(fen);
    },

    moves: function(settings) {
      var ugly_moves = generate_moves();
      var moves = [];
      for (i = 0; i < ugly_moves.length; i++) {

        /* does the user want a full move object, or just SAN */
        if (settings != undefined && 'verbose' in settings && settings.verbose) {
          var move = ugly_moves[i];
          move.san = move_to_san(move);
          move.to = algebraic(move.to);
          move.from = algebraic(move.from);
          moves.push(move);
        } else {
          moves.push(move_to_san(ugly_moves[i]));
        }
      }

      return moves;
    },

    in_check: function() {
      return in_check();
    },

    in_checkmate: function() {
      return in_checkmate();
    },

    in_stalemate: function() {
      return in_stalemate();
    },

    in_draw: function() {
      return in_draw();
    },

    fen: function() {
      return generate_fen();
    },

    turn: function() {
      return turn;
    },

    move: function(from, to) {

      /* from is either a string in SAN (eg "Nxb7+"), a square (eg "a3") or a
       * move object
       */

      var move = null;
      var moves = generate_moves();

      if (typeof(from) == 'object') {
        move = from;

        /* if it's a move object, convert to/from coordinates to 0x88 integers */
        if (typeof(move.from) == 'string') {
          move.from = square_num(move.from)
        }
        if (typeof(from.to) == 'string') {
          move.to = square_num(move.to)
        }
      } else {
        /* convert the move string to a move object */
        for (var i = 0; i < moves.length; i++) {
          if (from == move_to_san(moves[i]) || 
             (from == algebraic(moves[i].from) && to == algebraic(moves[i].to))) {
            move = moves[i];
            break;
          }
        }
      }

      /* failed to find move */
      if (move == null) {
        return false;
      }

      return make_move(move);
    },

    undo: function() {
      undo_move();
    },

    clear: function() {
      return clear();
    },

    put: function(piece_square) {
      return put(piece_square);
    },

    get: function(square) {
      return get(square);
    },

    perft: function(depth) {
      return perft(depth);
    },


  }
}

/* export Chess object if using node or any other CommonJS compatible
 * environment */
if (typeof exports != 'undefined') exports.Chess = Chess;
