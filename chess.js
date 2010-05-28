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

Chess.BLACK = 'b';
Chess.WHITE = 'w';

Chess.EMPTY = -1;

Chess.PAWN = 'p';
Chess.KNIGHT = 'n';
Chess.BISHOP = 'b';
Chess.ROOK = 'r';
Chess.QUEEN = 'q';
Chess.KING = 'k';

Chess.PAWN_OFFSETS = {
  b: [16, 32, 17, 15],
  w: [-16, -32, -17, -15],
};

Chess.PIECE_OFFSETS = {
  n: [-18, -33, -31, -14,  18, 33, 31,  14], 
  b: [-17, -15,  17,  15], 
  r: [-16,   1,  16,  -1], 
  q: [-17, -16, -15,   1,  17, 16, 15,  -1], 
  k: [-17, -16, -15,   1,  17, 16, 15,  -1],
}

Chess.ATTACKS = [
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

Chess.RAYS = [
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

Chess.SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 }

Chess.FLAGS = {
  NORMAL: 'n',
  CAPTURE: 'c',
  BIG_PAWN: 'b',
  EP_CAPTURE: 'e',
  PROMOTION: 'p',
  KSIDE_CASTLE: 'k',
  QSIDE_CASTLE: 'q'
};

Chess.RANK_1 = 7;
Chess.RANK_2 = 6;
Chess.RANK_3 = 5;
Chess.RANK_4 = 4;
Chess.RANK_5 = 3;
Chess.RANK_6 = 2;
Chess.RANK_7 = 1;
Chess.RANK_8 = 0;

Chess.SQUARES = {
  a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
  a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
  a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
  a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
  a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
  a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
  a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
  a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
};

Chess.ROOKS = {
  w: [
     {square: Chess.SQUARES.a1, flag: Chess.FLAGS.QSIDE_CASTLE},
     {square: Chess.SQUARES.h1, flag: Chess.FLAGS.KSIDE_CASTLE}],
  b: [
     {square: Chess.SQUARES.a8, flag: Chess.FLAGS.QSIDE_CASTLE},
     {square: Chess.SQUARES.h8, flag: Chess.FLAGS.KSIDE_CASTLE}],
};

function Chess(fen) {
  if (typeof(fen) == 'undefined') {
    fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  } 
  this.load(fen);
}

Chess.prototype.clear = function() {
  this.board = new Array(128);
  this.kings = {w: Chess.EMPTY, b: Chess.EMPTY};
  this.turn = '';
  this.castling = {w: '', b: ''};
  this.ep_square = Chess.EMPTY;
  this.half_moves = 0;
  this.move_number = 0;
  this.history = [];
}

Chess.prototype.load = function(fen) {
  var tokens = fen.split(' ');
  var position = tokens[0];
  var square = 0;

  this.clear();

  for (var i = 0; i < position.length; i++) {
    var piece = position.charAt(i);

    if (piece == '/') {
      square += 8;
    } else if (is_digit(piece)) {
      square += parseInt(piece, 10); 
    } else {
      var color = (piece < 'a') ? Chess.WHITE : Chess.BLACK;
      piece = piece.toLowerCase();
      this.board[square] = {type: piece, color: color}; 

      if (piece == Chess.KING) {
        this.kings[color] = square;
      }
        
      square++;
    }
  }

  this.turn = tokens[1];

  if (tokens[2].indexOf('K') > -1) {
    this.castling.w += Chess.FLAGS.KSIDE_CASTLE;
  }
  if (tokens[2].indexOf('Q') > -1) {
    this.castling.w += Chess.FLAGS.QSIDE_CASTLE;
  }
  if (tokens[2].indexOf('k') > -1) {
    this.castling.b += Chess.FLAGS.KSIDE_CASTLE;
  }
  if (tokens[2].indexOf('q') > -1) {
    this.castling.b += Chess.FLAGS.QSIDE_CASTLE;
  }

  this.ep_square = (tokens[3] == '-') ? -1 : square_num(tokens[3]);
  this.half_moves = parseInt(tokens[4], 10);
  this.move_number = parseInt(tokens[5], 10);
}

Chess.prototype.fen = function() {

  var empty = 0;
  var output = '';

  for (var i = Chess.SQUARES.a8; i <= Chess.SQUARES.h1; i++) {
    if (this.board[i] == null) {
      empty++;
    } else {
      if (empty > 0) {
        output += empty;
        empty = 0;
      } 
      var color = this.board[i].color;
      var piece = this.board[i].type;

      output += (color == Chess.WHITE) ? 
               piece.toUpperCase() : piece.toLowerCase();
    }

    if ((i + 1) & 0x88) {
      if (empty > 0) {
        output += empty;
      }

      if (i != Chess.SQUARES.h1) {
        output += '/';
      }

      empty = 0;
      i += 8;
    }
  }

  var castling = this.castling.w.toUpperCase() + this.castling.b.toLowerCase();
  if (castling == '') {
    castling = '-';
  }

  var ep_square = (this.ep_square == Chess.EMPTY) ? '-' : algebraic(this.ep_square);

  output += ' ' + this.turn + ' ' + castling + ' ' + ep_square + 
           ' ' + this.half_moves + ' ' + this.move_number;

  return output;
}

Chess.prototype.get = function(square) {
  var piece = this.board[Chess.SQUARES[square]];
  return (piece == null) ? null
          : (piece.color == Chess.WHITE) ?
             piece.type.toUpperCase() : piece.type.toLowerCase();
}

Chess.prototype.put = function(piece_square) {
  var data = piece_square.split('@');
  var piece = data[0];
  var square = Chess.SQUARES[data[1]];
  var color = (piece < 'a') ? Chess.WHITE : Chess.BLACK;
  this.board[square] = {type: piece, color: color};
  if (piece.toLowerCase() == Chess.KING) {
    this.kings[color] = square;
  }
}

Chess.prototype.moves = function(settings) {

  function add_move(board, moves, from, to, flags) {
    /* if pawn promotion */
    if (board[from].type == Chess.PAWN && 
       (rank(to) == Chess.RANK_8 || rank(to) == Chess.RANK_1)) {
        var pieces = [Chess.QUEEN, Chess.ROOK, Chess.BISHOP, Chess.KNIGHT];
        for (var i = 0; i < pieces.length; i++) {
          var promotion = {
            from: from,
            to: to,
            flags: flags + Chess.FLAGS.PROMOTION,
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

  /* convert a move from algebraic coordinates to algebraic notation */
  function to_string(chess, move) {
    var output = '';

    if (move.flags.indexOf(Chess.FLAGS.KSIDE_CASTLE) > -1) {
      output = 'O-O';
    } else if (move.flags.indexOf(Chess.FLAGS.QSIDE_CASTLE) > -1) {
      output = 'O-O-O';
    } else {
      var disambiguator = chess.get_disambiguator(move);

      if (move.old_piece.type != Chess.PAWN) {
        output += move.old_piece.type.toUpperCase() + disambiguator;
      }

      if (move.flags.indexOf(Chess.FLAGS.CAPTURE) > -1 ||
          move.flags.indexOf(Chess.FLAGS.EP_CAPTURE) > -1) {
        if (move.old_piece.type == Chess.PAWN) {
          output += algebraic(move.from)[0];
        }
        output += 'x';    
      }

      output += algebraic(move.to);

      if (move.flags.indexOf(Chess.FLAGS.PROMOTION) > -1) {
        output += '=' + move.new_piece.type.toUpperCase();
      }
    }

    chess.make_move(move);
    if (chess.in_check()) {
      if (chess.in_checkmate()) {
        output += '#';
      } else {
        output += '+';
      }
    }
    chess.undo_move();

    return output;
  }

  var moves = [];
  var color = this.turn;
  var opponent_color = swap_color(color);
  var second_rank = {b: Chess.RANK_7, w: Chess.RANK_2};

  for (var i = 0; i < this.board.length; i++) {
    piece = this.board[i];
    if (piece == null || piece.color != color) {
      continue;
    }

    if (piece.type == Chess.PAWN) { 
      /* single square, non-capturing */
      var square = i + Chess.PAWN_OFFSETS[color][0]; 
      if (this.board[square] == null) {
          add_move(this.board, moves, i, square, Chess.FLAGS.NORMAL);

        /* double square */
        var square = i + Chess.PAWN_OFFSETS[color][1]; 
        if (second_rank[color] == rank(i) && this.board[square] == null) {
          add_move(this.board, moves, i, square, Chess.FLAGS.BIG_PAWN);
        }
      }
      
      /* pawn captures */
      for (j = 2; j < 4; j++) {
        var square = i + Chess.PAWN_OFFSETS[color][j];
        if (square & 0x88) continue;

        if (this.board[square] != null && 
            this.board[square].color == opponent_color) {
            add_move(this.board, moves, i, square, Chess.FLAGS.CAPTURE);
        } else if (square == this.ep_square) {
            add_move(this.board, moves, i, this.ep_square, Chess.FLAGS.EP_CAPTURE);
        }
      }
    } else {
      for (var j = 0; j < Chess.PIECE_OFFSETS[piece.type].length; j++) {
        var offset = Chess.PIECE_OFFSETS[piece.type][j];
        var square = i;

        while (true) {
          square += offset;
          if (square & 0x88) break;

          if (this.board[square] == null) {
            add_move(this.board, moves, i, square, Chess.FLAGS.NORMAL);
          } else {
            if (this.board[square].color == color) break;
            add_move(this.board, moves, i, square, Chess.FLAGS.CAPTURE);
            break;
          }

          /* break, if knight or king */
          if (piece.type == 'n' || piece.type == 'k') break;
        }
      }
    }
  }

  /* king-side castling */
  if (this.castling[this.turn].indexOf(Chess.FLAGS.KSIDE_CASTLE) > -1) {
    var castling_from = this.kings[this.turn];
    var castling_to = castling_from + 2;

    if (this.board[castling_from + 1] == null &&
        this.board[castling_to]       == null &&
        !this.attacked(opponent_color, this.kings[this.turn]) &&
        !this.attacked(opponent_color, castling_from + 1) &&
        !this.attacked(opponent_color, castling_to)) {
      add_move(this.board, moves, this.kings[this.turn] , castling_to, 
               Chess.FLAGS.KSIDE_CASTLE);
    }
  }

  /* queen-side castling */
  if (this.castling[this.turn].indexOf(Chess.FLAGS.QSIDE_CASTLE) > -1) {
    var castling_from = this.kings[this.turn];
    var castling_to = castling_from - 2;

    if (this.board[castling_from - 1] == null &&
        this.board[castling_from - 2] == null &&
        this.board[castling_from - 3] == null &&
        !this.attacked(opponent_color, this.kings[this.turn]) &&
        !this.attacked(opponent_color, castling_from - 1) &&
        !this.attacked(opponent_color, castling_to)) {
      add_move(this.board, moves, this.kings[this.turn], castling_to, 
               Chess.FLAGS.QSIDE_CASTLE);
    }
  }

  /* if no parameters passed in, assume legal w/ algebraic moves */
  if (typeof(settings) == 'undefined') {
    settings = {legal: true, algebraic: true};
  }

  /* add string descriptions of the move, e.g.: Nxf6+, e5, Qd3#, or O-O-O */
  if (settings.algebraic) {
    for (var i = 0; i < moves.length; i++) {
      moves[i].move = to_string(this, moves[i]);
    }
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
    this.make_move(moves[i]);
    if (!this.king_attacked(color)) {
      legal_moves.push(moves[i]);
    }
    this.undo_move();
  }

  return legal_moves;
}

Chess.prototype.attacked = function(color, square) {
  for (var i = 0; i < this.board.length; i++) {
    if (i & 0x88) { i += 7; continue; }

    /* if empty square or wrong color */
    if (this.board[i] == null || this.board[i].color != color) continue;

    var piece = this.board[i];
    var difference = i - square;
    var index = difference + 119;
  
    if (Chess.ATTACKS[index] & (1 << Chess.SHIFTS[piece.type])) {
      if (piece.type == Chess.PAWN) {
        if (difference > 0) {
          if (piece.color == Chess.WHITE) return true;
        } else {
          if (piece.color == Chess.BLACK) return true;
        }                 
        continue; 
      }       

      /* if the piece is a knight or a king */
      if (piece.type == 'n' || piece.type == 'k') return true;

      var offset = Chess.RAYS[index];
      var j = i + offset;

      var blocked = false;
      while (j != square) {           
        if (this.board[j] != null) { blocked = true; break; }   
        j += offset;
      }

      if (!blocked) return true;
    }
  }

  return false;
}

Chess.prototype.king_attacked = function(color) {
  return this.attacked(swap_color(color), this.kings[color]);
}

Chess.prototype.in_check = function() {
  return this.king_attacked(this.turn);
}

Chess.prototype.in_checkmate = function() {
  if (!this.in_check()) {
    return false;
  }

  var moves = this.moves({legal: true, algebraic: false});
  return moves.length == 0;
}

Chess.prototype.in_stalemate = function() {
  if (this.in_check()) {
    return false;
  }

  var moves = this.moves({legal: true, algebraic: false});
  return moves.length == 0;
}

Chess.prototype.push = function() {
  this.history.push({
    board: this.board.slice(),
    kings: {b: this.kings.b, w: this.kings.w},
    turn: this.turn,
    castling: {b: this.castling.b, w: this.castling.w},
    ep_square: this.ep_square,
    half_moves: this.half_moves,
    move_number: this.move_number,
    history: this.history.slice()
  });
}

Chess.prototype.make_move = function(move) {

  /* make_move either takes a move object (higher performance) or a string in
   * algebraic notation (slower, but more human-friendly)
   */
  if (typeof(move) == 'string') {
    moves = this.moves();

    /* convert the string to a move object */
    for (i = 0; i < moves.length; i++) {
      if (move == moves[i].move) {
        move = moves[i];
        break;
      }
    }

    /* failed to find move */
    if (i == moves.length) {
      return false;
    }
  }

  var opponent_color = swap_color(this.turn);
  this.push();

  this.board[move.to] = this.board[move.from];
  this.board[move.from] = null;

  /* if ep capture, remove the captured pawn */
  if (move.flags.indexOf(Chess.FLAGS.EP_CAPTURE) > -1) {
    if (this.turn == 'b') {
      this.board[move.to - 16] = null;
    } else {
      this.board[move.to + 16] = null;
    }
  }

  /* if pawn promotion, replace with new piece */
  if (move.flags.indexOf(Chess.FLAGS.PROMOTION) > -1) {
    this.board[move.to] = move.new_piece;
  }

  /* if we moved the king */
  if (this.board[move.to].type == Chess.KING) {
    this.kings[this.board[move.to].color] = move.to;
    
    /* if we castled, move the rook next to the king */
    if (move.flags.indexOf(Chess.FLAGS.KSIDE_CASTLE) > -1) {
      var castling_to = move.to - 1;
      var castling_from = move.to + 1;
      this.board[castling_to] = this.board[castling_from];
      this.board[castling_from] = null;
    } else if (move.flags.indexOf(Chess.FLAGS.QSIDE_CASTLE) > -1) {
      var castling_to = move.to + 1;
      var castling_from = move.to - 2;
      this.board[castling_to] = this.board[castling_from];
      this.board[castling_from] = null;
    }
      
    /* turn off castling */
    this.castling[this.turn] = '';
  }

  /* turn off castling if we move a rook */
  if (this.castling[this.turn] != '') {

    for (var i = 0; i < Chess.ROOKS[this.turn].length; i++) {
      if (move.from == Chess.ROOKS[this.turn][i].square) {
        this.castling[this.turn] = 
          this.castling[this.turn].replace(Chess.ROOKS[this.turn][i].flag);
        break;
      }
    }
  }

  /* turn off castling if we capture a rook */
  if (this.castling[opponent_color] != '') {
    for (var i = 0; i < Chess.ROOKS[opponent_color].length; i++) {
      if (move.to == Chess.ROOKS[opponent_color][i].square) {
        this.castling[opponent_color] = 
          this.castling[opponent_color].replace(Chess.ROOKS[opponent_color][i].flag);
        break;
      }
    }
  }

  /* if big pawn move, update the en passant square */
  if (move.flags.indexOf(Chess.FLAGS.BIG_PAWN) > -1) {
    if (this.turn == 'b') {
      this.ep_square = move.to - 16;
    } else { 
      this.ep_square = move.to + 16;
    }
  } else {
    this.ep_square = Chess.EMPTY;
  }

  /* reset the 50 move counter if a pawn is moved or a piece is captured */
  if (move.old_piece.type == Chess.PAWN) {
    this.half_moves = 0;
  } else if (move.flags.indexOf(Chess.FLAGS.CAPTURE) > -1) {
    this.half_moves = 0;
  } else {
    this.half_moves++;
  }

  if (this.turn == Chess.BLACK) {
    this.move_number++;
  }
  this.turn = swap_color(this.turn);

  return true;
}

Chess.prototype.undo_move = function() {
  old = this.history.pop();
  this.board = old.board;
  this.kings = old.kings;
  this.turn = old.turn;
  this.castling = old.castling;
  this.ep_square = old.ep_square;
  this.half_moves = old.half_moves;
  this.move_number = old.move_number;
  this.history = old.history;
}

/* this function is used to uniquely identify ambiguous moves */ 
Chess.prototype.get_disambiguator = function(move) {
  moves = this.moves({legal: true, algebraic: false});

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
  return c == Chess.WHITE ? Chess.BLACK : Chess.WHITE;
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
Chess.prototype.log_board = function() { 
  var console = document.getElementById('console');
  var s = '';
  for (var i = 0; i < 128; i++) {
    if (this.board[i] != null) {
      s += (this.board[i].color == Chess.WHITE) ? 
        this.board[i].type.toUpperCase() : this.board[i].type.toLowerCase();
    } else {
      s += '-';
    }
    if ((i + 1) & 0x88) {
      console.innerHTML += s + '<br />';
      s = '';
      i += 8;
    }
  }
  return s;
}

Chess.prototype.log_moves = function(legal) {
  var console = document.getElementById('console');

  if (typeof(legal) == 'undefined') {
    var legal = true;
  }
  var moves = this.moves({legal: legal, algebraic: true});
  for (var i = 0; i < moves.length; i++) {
    console.innerHTML += '#' + i + ' ' + moves[i].move + ' ' + 
                         algebraic(moves[i].from) + '-' + 
                         algebraic(moves[i].to) + '  ' + 
                         moves[i].flags + '<br />';
  }
}

Chess.prototype.perft = function(depth) {
  var moves = this.moves({legal: false, algebraic: false})
  var nodes = 0;
  var color = this.turn;

  for (var i = 0; i < moves.length; i++) {
    this.make_move(moves[i]);
    if (!this.king_attacked(color)) {
      if (depth - 1 > 0) {
        var child_nodes = this.perft(depth - 1);
        nodes += child_nodes;
        //console.log(depth + '-' + i + ' ' + algebraic(moves[i].from) + '-' +
        //            algebraic(moves[i].to) + ', ' +
        //            moves[i].new_piece.type + ' = ' + child_nodes);
      } else {
        nodes++;
      }
    }
    this.undo_move();
  }

  return nodes;
}
