(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Chess = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/***************************************************************************
 * PUBLIC API
 **************************************************************************/
'use strict';

function api(chessObj) {
  this.chess = chessObj;
}

api.prototype = {
  WHITE: WHITE,
  BLACK: BLACK,
  PAWN: PAWN,
  KNIGHT: KNIGHT,
  BISHOP: BISHOP,
  ROOK: ROOK,
  QUEEN: QUEEN,
  KING: KING,
  SQUARES: ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
            'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
            'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
            'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
            'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
            'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
            'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
            'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],

  FLAGS: FLAGS,

  load: function(fen) {
    this.chess.load(fen);
  },

  reset: function() {
    return this.chess.reset();
  },

  moves: function(options) {
    return this.chess.moves(options);
  },

  inCheck: function() {
    return this.chess.inCheck();
  },

  inCheckmate: function() {
    return this.chess.inCheckmate();
  },

  inStalemate: function() {
    return this.chess.inStalemate();
  },

  inDraw: function() {
    return this.chess.halfMoves >= 100 ||
      this.chess.inStalemate() ||
      this.chess.insufficientMaterial() ||
      this.chess.inThreefoldRepetition();
  },

  insufficientMaterial: function() {
    return this.chess.insufficientMaterial();
  },

  inThreefoldRepetition: function() {
    return this.chess.inThreefoldRepetition();
  },

  gameOver: function() {
    return this.chess.halfMoves >= 100 ||
      this.chess.inCheckmate() ||
      this.chess.inStalemate() ||
             this.chess.insufficientMaterial() ||
      this.chess.inThreefoldRepetition();
  },

  validateFen: function(fen) {
    return this.chess.validateFen(fen);
  },

  fen: function() {
    return this.chess.generateFen();
  },

  pgn: function(options) {
    return this.chess.pgn(options);
  },

  /* convert a move from Standard Algebraic Notation (SAN) to 0x88
   * coordinates
   */
  moveFromSan: function(move) {
    return this.chess.moveFromSan(move);
  },

  loadPgn: function(pgn, options) {
    return this.chess.loadPgn(pgn, options);
  },

  header: function(args) {
    return this.chess.setHeader(args);
  },

  ascii: function() {
    return this.chess.ascii();
  },

  turn: function() {
    return this.chess.turn;
  },

  move: function(move) {
    return this.chess.move(move);
  },

  undo: function() {
    var move = this.chess.undoMove();
    return (move) ? this.chess.makePretty(move) : null;
  },

  clear: function() {
    return this.chess.clear();
  },

  put: function(piece, square) {
    return this.chess.put(piece, square);
  },

  get: function(square) {
    return this.chess.get(square);
  },

  remove: function(square) {
    return this.chess.remove(square);
  },

  perft: function(depth) {
    return this.chess.perft(depth);
  },

  squareColor: function(square) {
    if (square in this.chess.SQUARES) {
      var sq0x88 = this.chess.SQUARES[square];
      return ((this.chess.rank(sq0x88) + this.chess.file(sq0x88)) % 2 === 0) ? 'light' : 'dark';
    }

    return null;
  },

  history: function(options) {
    var reversedHistory = [];
    var moveHistory = [];
    var verbose = (typeof options !== 'undefined' && 'verbose' in options &&
                   options.verbose);

    while (this.chess.history.length > 0) {
      reversedHistory.push(this.chess.undoMove());
    }

    while (reversedHistory.length > 0) {
      var move = reversedHistory.pop();
      if (verbose) {
        moveHistory.push(this.chess.makePretty(move));
      } else {
        moveHistory.push(this.chess.moveToSan(move));
      }
      this.chess.makeMove(move);
    }

    return moveHistory;
  }
};

module.exports = api;


},{}],2:[function(require,module,exports){
'use strict';

function Chess(fen) {

  this.board = new Array(128);
  this.kings = {w: EMPTY, b: EMPTY};
  this.turn = WHITE;
  this.castling = {w: 0, b: 0};
  this.epSquare = EMPTY;
  this.halfMoves = 0;
  this.moveNumber = 1;
  this.history = [];
  this.header = {};

  /* if the user passes in a fen string, load it, else default to
   * starting position
   */
  if (typeof fen === 'undefined') {
    this.load(DEFAULT_POSITION);
  } else {
    this.load(fen);
  }

}

Chess.prototype = {
  clear: function() {
    this.board = new Array(128);
    this.kings = {w: EMPTY, b: EMPTY};
    this.turn = WHITE;
    this.castling = {w: 0, b: 0};
    this.epSquare = EMPTY;
    this.halfMoves = 0;
    this.moveNumber = 1;
    this.history = [];
    this.header = {};
    this.updateSetup(this.generateFen());
  },

  reset: function() {
    this.load(DEFAULT_POSITION);
  },

  load: function(fen) {
    var tokens = fen.split(/\s+/);
    var position = tokens[0];
    var square = 0;
    var valid = SYMBOLS + '12345678/';

    if (!this.validateFen(fen).valid) {
      return false;
    }

    this.clear();

    for (var i = 0; i < position.length; i++) {
      var piece = position.charAt(i);

      if (piece === '/') {
        square += 8;
      } else if (this.isDigit(piece)) {
        square += parseInt(piece, 10);
      } else {
        var color = (piece < 'a') ? WHITE : BLACK;
        this.put({type: piece.toLowerCase(), color: color}, this.algebraic(square));
        square++;
      }
    }

    this.turn = tokens[1];

    if (tokens[2].indexOf('K') > -1) {
      this.castling.w |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('Q') > -1) {
      this.castling.w |= BITS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf('k') > -1) {
      this.castling.b |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('q') > -1) {
      this.castling.b |= BITS.QSIDE_CASTLE;
    }

    this.epSquare = (tokens[3] === '-') ? EMPTY : SQUARES[tokens[3]];
    this.halfMoves = parseInt(tokens[4], 10);
    this.moveNumber = parseInt(tokens[5], 10);

    this.updateSetup(this.generateFen());

    return true;
  },

  validateFen: function(fen) {

    /* 1st criterion: 6 space-seperated fields? */
    var tokens = fen.split(/\s+/);
    if (tokens.length !== 6) {
      return {valid: false, errorNumber: 1, error: ERRORS[1]};
    }

    /* 2nd criterion: move number field is a integer value > 0? */
    if (isNaN(tokens[5]) || (parseInt(tokens[5], 10) <= 0)) {
      return {valid: false, errorNumber: 2, error: ERRORS[2]};
    }

    /* 3rd criterion: half move counter is an integer >= 0? */
    if (isNaN(tokens[4]) || (parseInt(tokens[4], 10) < 0)) {
      return {valid: false, errorNumber: 3, error: ERRORS[3]};
    }

    /* 4th criterion: 4th field is a valid e.p.-string? */
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return {valid: false, errorNumber: 4, error: ERRORS[4]};
    }

    /* 5th criterion: 3th field is a valid castle-string? */
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
      return {valid: false, errorNumber: 5, error: ERRORS[5]};
    }

    /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
    if (!/^(w|b)$/.test(tokens[1])) {
      return {valid: false, errorNumber: 6, error: ERRORS[6]};
    }

    /* 7th criterion: 1st field contains 8 rows? */
    var rows = tokens[0].split('/');
    if (rows.length !== 8) {
      return {valid: false, errorNumber: 7, error: ERRORS[7]};
    }

    /* 8th criterion: every row is valid? */
    for (var i = 0; i < rows.length; i++) {
      /* check for right sum of fields AND not two numbers in succession */
      var sumFields = 0;
      var previousWasNumber = false;

      for (var k = 0; k < rows[i].length; k++) {
        if (!isNaN(rows[i][k])) {
          if (previousWasNumber) {
            return {valid: false, errorNumber: 8, error: ERRORS[8]};
          }
          sumFields += parseInt(rows[i][k], 10);
          previousWasNumber = true;
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return {valid: false, errorNumber: 9, error: ERRORS[9]};
          }
          sumFields += 1;
          previousWasNumber = false;
        }
      }
      if (sumFields !== 8) {
        return {valid: false, errorNumber: 10, error: ERRORS[10]};
      }
    }

    /* everything's okay! */
    return {valid: true, errorNumber: 0, error: ERRORS[0]};
  },

  generateFen: function() {
    var empty = 0;
    var fen = '';

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (this.board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        var color = this.board[i].color;
        var piece = this.board[i].type;

        fen += (color === WHITE) ?
                 piece.toUpperCase() : piece.toLowerCase();
      }

      if ((i + 1) & 0x88) {
        if (empty > 0) {
          fen += empty;
        }

        if (i !== SQUARES.h1) {
          fen += '/';
        }

        empty = 0;
        i += 8;
      }
    }

    var cflags = '';
    if (this.castling[WHITE] & BITS.KSIDE_CASTLE) { cflags += 'K'; }
    if (this.castling[WHITE] & BITS.QSIDE_CASTLE) { cflags += 'Q'; }
    if (this.castling[BLACK] & BITS.KSIDE_CASTLE) { cflags += 'k'; }
    if (this.castling[BLACK] & BITS.QSIDE_CASTLE) { cflags += 'q'; }

    /* do we have an empty castling flag? */
    cflags = cflags || '-';
    var epflags = (this.epSquare === EMPTY) ? '-' : this.algebraic(this.epSquare);

    return [fen, this.turn, cflags, epflags, this.halfMoves, this.moveNumber].join(' ');
  },

  setHeader: function(args) {
    for (var i = 0; i < args.length; i += 2) {
      if (typeof args[i] === 'string' &&
          typeof args[i + 1] === 'string') {
        this.header[args[i]] = args[i + 1];
      }
    }
    return this.header;
  },

  /* called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object.  if the FEN is
   * equal to the default position, the SetUp and FEN are deleted
   * the setup is only updated if history.length is zero, ie moves haven't been
   * made.
   */
  updateSetup: function(fen) {

    if (this.history.length > 0) {
      return;
    }

    if (fen !== DEFAULT_POSITION) {
      this.header['SetUp'] = '1';
      this.header['FEN'] = fen;
    } else {
      delete this.header['SetUp'];
      delete this.header['FEN'];
    }
  },

  get: function(square) {
    var piece = this.board[SQUARES[square]];
    return (piece) ? {type: piece.type, color: piece.color} : null;
  },

  put: function(piece, square) {
    /* check for valid piece object */
    if (!('type' in piece && 'color' in piece)) {
      return false;
    }

    /* check for piece */
    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
      return false;
    }

    /* check for valid square */
    if (!(square in SQUARES)) {
      return false;
    }

    var sq = SQUARES[square];

    /* don't let the user place more than one king */
    if (piece.type === KING &&
        !(this.kings[piece.color] === EMPTY || this.kings[piece.color] === sq)) {
      return false;
    }

    this.board[sq] = {type: piece.type, color: piece.color};
    if (piece.type === KING) {
      this.kings[piece.color] = sq;
    }

    this.updateSetup(this.generateFen());

    return true;
  },

  remove: function(square) {
    var piece = this.get(square);
    this.board[SQUARES[square]] = null;
    if (piece && piece.type === KING) {
      this.kings[piece.color] = EMPTY;
    }

    this.updateSetup(this.generateFen());

    return piece;
  },

  buildMove: function(from, to, flags, promotion) {
    var move = {
      color: this.turn,
      from: from,
      to: to,
      flags: flags,
      piece: this.board[from].type
    };

    if (promotion) {
      move.flags |= BITS.PROMOTION;
      move.promotion = promotion;
    }

    if (this.board[to]) {
      move.captured = this.board[to].type;
    } else if (flags & BITS.EP_CAPTURE) {
      move.captured = PAWN;
    }
    return move;
  },

  addMove: function(moves, from, to, flags) {
    /* if pawn promotion */
    if (this.board[from].type === PAWN &&
        (this.rank(to) === RANK_8 || this.rank(to) === RANK_1)) {
      var pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
      for (var i = 0, len = pieces.length; i < len; i++) {
        moves.push(this.buildMove(from, to, flags, pieces[i]));
      }
    } else {
      moves.push(this.buildMove(from, to, flags));
    }
  },

  generateMoves: function(options) {
    var moves = [];
    var us = this.turn;
    var them = this.swapColor(us);
    var secondRank = {b: RANK_7, w: RANK_2};

    var firstSq = SQUARES.a8;
    var lastSq = SQUARES.h1;
    var singleSquare = false;

    /* do we want legal moves? */
    var legal = (typeof options !== 'undefined' && 'legal' in options) ?
        options.legal : true;

    /* are we generating moves for a single square? */
    if (typeof options !== 'undefined' && 'square' in options) {
      if (options.square in SQUARES) {
        firstSq = lastSq = SQUARES[options.square];
        singleSquare = true;
      } else {
        /* invalid square */
        return [];
      }
    }

    for (var i = firstSq; i <= lastSq; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) { i += 7; continue; }

      var piece = this.board[i];
      if (piece == null || piece.color !== us) {
        continue;
      }

      if (piece.type === PAWN) {
        /* single square, non-capturing */
        var square = i + PAWN_OFFSETS[us][0];
        if (this.board[square] == null) {
          this.addMove(moves, i, square, BITS.NORMAL);

          /* double square */
          var square = i + PAWN_OFFSETS[us][1];
          if (secondRank[us] === this.rank(i) && this.board[square] == null) {
            this.addMove(moves, i, square, BITS.BIG_PAWN);
          }
        }

        /* pawn captures */
        for (j = 2; j < 4; j++) {
          var square = i + PAWN_OFFSETS[us][j];
          if (square & 0x88) {
            continue;
          }

          if (this.board[square] != null &&
              this.board[square].color === them) {
            this.addMove(moves, i, square, BITS.CAPTURE);
          } else if (square === this.epSquare) {
            this.addMove(moves, i, square, BITS.EP_CAPTURE);
          }
        }
      } else {
        for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
          var offset = PIECE_OFFSETS[piece.type][j];
          var square = i;

          while (true) {
            square += offset;
            if (square & 0x88) {
              break;
            }

            if (this.board[square] == null) {
              this.addMove(moves, i, square, BITS.NORMAL);
            } else {
              if (this.board[square].color === us) {
                break;
              }
              this.addMove(moves, i, square, BITS.CAPTURE);
              break;
            }

            /* break, if knight or king */
            if (piece.type === KNIGHT || piece.type === KING) {
              break;
            }
          }
        }
      }
    }

    /* check for castling if: a) we're generating all moves, or b) we're doing
     * single square move generation on the king's square
     */
    if ((!singleSquare) || lastSq === this.kings[us]) {
      /* king-side castling */
      if (this.castling[us] & BITS.KSIDE_CASTLE) {
        var castlingFrom = this.kings[us];
        var castlingTo = castlingFrom + 2;

        if (this.board[castlingFrom + 1] == null &&
            this.board[castlingTo]       == null &&
            !this.attacked(them, this.kings[us]) &&
            !this.attacked(them, castlingFrom + 1) &&
            !this.attacked(them, castlingTo)) {
          this.addMove(moves, this.kings[us] , castlingTo,
                   BITS.KSIDE_CASTLE);
        }
      }

      /* queen-side castling */
      if (this.castling[us] & BITS.QSIDE_CASTLE) {
        var castlingFrom = this.kings[us];
        var castlingTo = castlingFrom - 2;

        if (this.board[castlingFrom - 1] == null &&
            this.board[castlingFrom - 2] == null &&
            this.board[castlingFrom - 3] == null &&
            !this.attacked(them, this.kings[us]) &&
            !this.attacked(them, castlingFrom - 1) &&
            !this.attacked(them, castlingTo)) {
          this.addMove(moves, this.kings[us], castlingTo,
                   BITS.QSIDE_CASTLE);
        }
      }
    }

    /* return all pseudo-legal moves (this includes moves that allow the king
     * to be captured)
     */
    if (!legal) {
      return moves;
    }

    /* filter out illegal moves */
    var legalMoves = [];
    for (var i = 0, len = moves.length; i < len; i++) {
      this.makeMove(moves[i]);
      if (!this.kingAttacked(us)) {
        legalMoves.push(moves[i]);
      }
      this.undoMove();
    }

    return legalMoves;
  },

  /* convert a move from 0x88 coordinates to Standard Algebraic Notation
   * (SAN)
   */
  moveToSan: function(move) {
    var output = '';

    if (move.flags & BITS.KSIDE_CASTLE) {
      output = 'O-O';
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = 'O-O-O';
    } else {
      var disambiguator = this.getDisambiguator(move);

      if (move.piece !== PAWN) {
        output += move.piece.toUpperCase() + disambiguator;
      }

      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += this.algebraic(move.from)[0];
        }
        output += 'x';
      }

      output += this.algebraic(move.to);

      if (move.flags & BITS.PROMOTION) {
        output += '=' + move.promotion.toUpperCase();
      }
    }

    this.makeMove(move);
    if (this.inCheck()) {
      if (this.inCheckmate()) {
        output += '#';
      } else {
        output += '+';
      }
    }
    this.undoMove();

    return output;
  },

  /* convert a move from Standard Algebraic Notation (SAN) to 0x88
   * coordinates
   */
  moveFromSan: function(move) {
    /* strip off any move decorations: e.g Nf3+?! */
    var moveReplaced = move.replace(/[+#?!=]/, '');
    var moves = this.generateMoves();
    for (var i = 0, len = moves.length; i < len; i++) {
      if (moveReplaced ===
          this.moveToSan(moves[i]).replace(/[+#?!=]/, '')) {
        return moves[i];
      }
    }
    return null;
  },

  attacked: function(color, square) {
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) { i += 7; continue; }

      /* if empty square or wrong color */
      if (this.board[i] == null || this.board[i].color !== color) {
        continue;
      }

      var piece = this.board[i];
      var difference = i - square;
      var index = difference + 119;

      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE) {
              return true;
            }
          } else {
            if (piece.color === BLACK) {
              return true;
            }
          }
          continue;
        }

        /* if the piece is a knight or a king */
        if (piece.type === KNIGHT || piece.type === KING) {
          return true;
        }

        var offset = RAYS[index];
        var j = i + offset;

        var blocked = false;
        while (j !== square) {
          if (this.board[j] != null) { blocked = true; break; }
          j += offset;
        }

        if (!blocked) {
          return true;
        }
      }
    }

    return false;
  },

  kingAttacked: function(color) {
    return this.attacked(this.swapColor(color), this.kings[color]);
  },

  inCheck: function() {
    return this.kingAttacked(this.turn);
  },

  inCheckmate: function() {
    return this.inCheck() && this.generateMoves().length === 0;
  },

  inStalemate: function() {
    return !this.inCheck() && this.generateMoves().length === 0;
  },

  insufficientMaterial: function() {
    var pieces = {};
    var bishops = [];
    var numPieces = 0;
    var sqColor = 0;

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      sqColor = (sqColor + 1) % 2;
      if (i & 0x88) {
        i += 7;
        continue;
      }

      var piece = this.board[i];
      if (piece) {
        pieces[piece.type] = (piece.type in pieces) ?
                              pieces[piece.type] + 1 : 1;
        if (piece.type === BISHOP) {
          bishops.push(sqColor);
        }
        numPieces++;
      }
    }

    /* k vs. k */
    if (numPieces === 2) {
      return true;

    /* k vs. kn .... or .... k vs. kb */
    } else if (numPieces === 3 && (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)) {
      return true;

    /* kb vs. kb where any number of bishops are all on the same color */
    }   else if (numPieces === pieces[BISHOP] + 2) {
      var sum = 0;
      var len = bishops.length;
      for (var i = 0; i < len; i++) {
        sum += bishops[i];
      }
      if (sum === 0 || sum === len) { return true; }
    }

    return false;
  },

  inThreefoldRepetition: function() {
    /* TODO: while this function is fine for casual use, a better
     * implementation would use a Zobrist key (instead of FEN). the
     * Zobrist key would be maintained in the makeMove/undoMove functions,
     * avoiding the costly that we do below.
     */
    var moves = [];
    var positions = {};
    var repetition = false;

    while (true) {
      var move = this.undoMove();
      if (!move) {
        break;
      }
      moves.push(move);
    }

    while (true) {
      /* remove the last two fields in the FEN string, they're not needed
       * when checking for draw by rep */
      var fen = this.generateFen().split(' ').slice(0, 4).join(' ');

      /* has the position occurred three or move times */
      positions[fen] = (fen in positions) ? positions[fen] + 1 : 1;
      if (positions[fen] >= 3) {
        repetition = true;
      }

      if (!moves.length) {
        break;
      }
      this.makeMove(moves.pop());
    }

    return repetition;
  },

  push: function(move) {
    this.history.push({
      move: move,
      kings: {b: this.kings.b, w: this.kings.w},
      turn: this.turn,
      castling: {b: this.castling.b, w: this.castling.w},
      epSquare: this.epSquare,
      halfMoves: this.halfMoves,
      moveNumber: this.moveNumber
    });
  },

  makeMove: function(move) {
    var us = this.turn;
    var them = this.swapColor(us);
    this.push(move);

    this.board[move.to] = this.board[move.from];
    this.board[move.from] = null;

    /* if ep capture, remove the captured pawn */
    if (move.flags & BITS.EP_CAPTURE) {
      if (this.turn === BLACK) {
        this.board[move.to - 16] = null;
      } else {
        this.board[move.to + 16] = null;
      }
    }

    /* if pawn promotion, replace with new piece */
    if (move.flags & BITS.PROMOTION) {
      this.board[move.to] = {type: move.promotion, color: us};
    }

    /* if we moved the king */
    if (this.board[move.to].type === KING) {
      this.kings[this.board[move.to].color] = move.to;

      /* if we castled, move the rook next to the king */
      if (move.flags & BITS.KSIDE_CASTLE) {
        var castlingTo = move.to - 1;
        var castlingFrom = move.to + 1;
        this.board[castlingTo] = this.board[castlingFrom];
        this.board[castlingFrom] = null;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        var castlingTo = move.to + 1;
        var castlingFrom = move.to - 2;
        this.board[castlingTo] = this.board[castlingFrom];
        this.board[castlingFrom] = null;
      }

      /* turn off castling */
      this.castling[us] = '';
    }

    /* turn off castling if we move a rook */
    if (this.castling[us]) {
      for (var i = 0, len = ROOKS[us].length; i < len; i++) {
        if (move.from === ROOKS[us][i].square &&
            this.castling[us] & ROOKS[us][i].flag) {
          this.castling[us] ^= ROOKS[us][i].flag;
          break;
        }
      }
    }

    /* turn off castling if we capture a rook */
    if (this.castling[them]) {
      for (var i = 0, len = ROOKS[them].length; i < len; i++) {
        if (move.to === ROOKS[them][i].square &&
            this.castling[them] & ROOKS[them][i].flag) {
          this.castling[them] ^= ROOKS[them][i].flag;
          break;
        }
      }
    }

    /* if big pawn move, update the en passant square */
    if (move.flags & BITS.BIG_PAWN) {
      if (this.turn === BLACK) {
        this.epSquare = move.to - 16;
      } else {
        this.epSquare = move.to + 16;
      }
    } else {
      this.epSquare = EMPTY;
    }

    /* reset the 50 move counter if a pawn is moved or a piece is captured */
    if (move.piece === PAWN) {
      this.halfMoves = 0;
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      this.halfMoves = 0;
    } else {
      this.halfMoves++;
    }

    if (this.turn === BLACK) {
      this.moveNumber++;
    }
    this.turn = this.swapColor(this.turn);
  },

  undoMove: function() {
    var old = this.history.pop();
    if (old == null) { return null; }

    var move = old.move;

    this.kings = old.kings;
    this.turn = old.turn;
    this.castling = old.castling;
    this.epSquare = old.epSquare;
    this.halfMoves = old.halfMoves;
    this.moveNumber = old.moveNumber;

    var us = this.turn;
    var them = this.swapColor(this.turn);

    this.board[move.from] = this.board[move.to];
    this.board[move.from].type = move.piece;  // to undo any promotions
    this.board[move.to] = null;

    if (move.flags & BITS.CAPTURE) {
      this.board[move.to] = {type: move.captured, color: them};
    } else if (move.flags & BITS.EP_CAPTURE) {
      var index;
      if (us === BLACK) {
        index = move.to - 16;
      } else {
        index = move.to + 16;
      }
      this.board[index] = {type: PAWN, color: them};
    }

    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      var castlingTo;
      var castlingFrom;
      if (move.flags & BITS.KSIDE_CASTLE) {
        castlingTo = move.to + 1;
        castlingFrom = move.to - 1;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        castlingTo = move.to - 2;
        castlingFrom = move.to + 1;
      }

      this.board[castlingTo] = this.board[castlingFrom];
      this.board[castlingFrom] = null;
    }

    return move;
  },

  /* this function is used to uniquely identify ambiguous moves */
  getDisambiguator: function(move) {
    var moves = this.generateMoves();

    var from = move.from;
    var to = move.to;
    var piece = move.piece;

    var ambiguities = 0;
    var sameRank = 0;
    var sameFile = 0;

    for (var i = 0, len = moves.length; i < len; i++) {
      var ambigFrom = moves[i].from;
      var ambigTo = moves[i].to;
      var ambigPiece = moves[i].piece;

      /* if a move of the same piece type ends on the same to square, we'll
       * need to add a disambiguator to the algebraic notation
       */
      if (piece === ambigPiece && from !== ambigFrom && to === ambigTo) {
        ambiguities++;

        if (this.rank(from) === this.rank(ambigFrom)) {
          sameRank++;
        }

        if (this.file(from) === this.file(ambigFrom)) {
          sameFile++;
        }
      }
    }

    if (ambiguities > 0) {
      /* if there exists a similar moving piece on the same rank and file as
       * the move in question, use the square as the disambiguator
       */
      if (sameRank > 0 && sameFile > 0) {
        return this.algebraic(from);

      /* if the moving piece rests on the same file, use the rank symbol as the
       * disambiguator
       */
      } else if (sameFile > 0) {
        return this.algebraic(from).charAt(1);

      /* else use the file symbol */
      } else {
        return this.algebraic(from).charAt(0);
      }
    }

    return '';
  },

  ascii: function() {
    var s = '   +------------------------+\n';
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* display the rank */
      if (this.file(i) === 0) {
        s += ' ' + '87654321'[this.rank(i)] + ' |';
      }

      /* empty piece */
      if (this.board[i] == null) {
        s += ' . ';
      } else {
        var piece = this.board[i].type;
        var color = this.board[i].color;
        var symbol = (color === WHITE) ?
                     piece.toUpperCase() : piece.toLowerCase();
        s += ' ' + symbol + ' ';
      }

      if ((i + 1) & 0x88) {
        s += '|\n';
        i += 8;
      }
    }
    s += '   +------------------------+\n';
    s += '     a  b  c  d  e  f  g  h\n';

    return s;
  },

  /*****************************************************************************
   * UTILITY FUNCTIONS
   ****************************************************************************/
  rank: function(i) {
    return i >> 4;
  },

  file: function(i) {
    return i & 15;
  },

  algebraic: function(i) {
    var f = this.file(i);
    var r = this.rank(i);
    return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1);
  },

  swapColor: function(c) {
    return c === WHITE ? BLACK : WHITE;
  },

  isDigit: function(c) {
    return '0123456789'.indexOf(c) !== -1;
  },

  /* pretty = external move object */
  makePretty: function(uglyMove) {
    var move = this.clone(uglyMove);
    move.san = this.moveToSan(move);
    move.to = this.algebraic(move.to);
    move.from = this.algebraic(move.from);

    var flags = '';

    for (var flag in BITS) {
      if (BITS[flag] & move.flags) {
        flags += FLAGS[flag];
      }
    }
    move.flags = flags;

    return move;
  },

  moves: function(options) {
    /* The internal representation of a chess move is in 0x88 format, and
     * not meant to be human-readable.  The code below converts the 0x88
     * square coordinates to algebraic coordinates.  It also prunes an
     * unnecessary move keys resulting from a verbose call.
     */

    var uglyMoves = this.generateMoves(options);
    var moves = [];

    for (var i = 0, len = uglyMoves.length; i < len; i++) {

      /* does the user want a full move object (most likely not), or just
       * SAN
       */
      if (typeof options !== 'undefined' && 'verbose' in options &&
          options.verbose) {
        moves.push(this.makePretty(uglyMoves[i]));
      } else {
        moves.push(this.moveToSan(uglyMoves[i]));
      }
    }

    return moves;
  },

  pgn: function(options) {
    /* using the specification from http://www.this.chessclub.com/help/PGN-spec
     * example for html usage: .pgn({ maxWidth: 72, newlineChar: "<br />" })
     */
    var newline = (typeof options === 'object' &&
                     typeof options.newlineChar === 'string') ?
          options.newlineChar : '\n';
    var maxWidth = (typeof options === 'object' &&
                     typeof options.maxWidth === 'number') ?
        options.maxWidth : 0;
    var result = [];
    var headerExists = false;

    /* add the PGN header headerrmation */
    for (var i in this.header) {
      /* TODO: order of enumerated properties in header object is not
       * guaranteed, see ECMA-262 spec (section 12.6.4)
       */
      result.push('[' + i + ' \"' + this.header[i] + '\"]' + newline);
      headerExists = true;
    }

    if (headerExists && this.history.length) {
      result.push(newline);
    }

    /* pop all of history onto reversedHistory */
    var reversedHistory = [];
    while (this.history.length > 0) {
      reversedHistory.push(this.undoMove());
    }

    var moves = [];
    var moveString = '';
    var pgnMoveNumber = 1;

    /* build the list of moves.  a moveString looks like: "3. e3 e6" */
    while (reversedHistory.length > 0) {
      var move = reversedHistory.pop();

      /* if the position started with black to move, start PGN with 1. ... */
      if (pgnMoveNumber === 1 && move.color === 'b') {
        moveString = '1. ...';
        pgnMoveNumber++;
      } else if (move.color === 'w') {
        /* store the previous generated moveString if we have one */
        if (moveString.length) {
          moves.push(moveString);
        }
        moveString = pgnMoveNumber + '.';
        pgnMoveNumber++;
      }

      moveString = moveString + ' ' + this.moveToSan(move);
      this.makeMove(move);
    }

    /* are there any other leftover moves? */
    if (moveString.length) {
      moves.push(moveString);
    }

    /* is there a result? */
    if (typeof this.header.Result !== 'undefined') {
      moves.push(this.header.Result);
    }

    /* history should be back to what is was before we started generating PGN,
     * so join together moves
     */
    if (maxWidth === 0) {
      return result.join('') + moves.join(' ');
    }

    /* wrap the PGN output at maxWidth */
    var currentWidth = 0;
    for (var i = 0; i < moves.length; i++) {
      /* if the current move will push past maxWidth */
      if (currentWidth + moves[i].length > maxWidth && i !== 0) {

        /* don't end the line with whitespace */
        if (result[result.length - 1] === ' ') {
          result.pop();
        }

        result.push(newline);
        currentWidth = 0;
      } else if (i !== 0) {
        result.push(' ');
        currentWidth++;
      }
      result.push(moves[i]);
      currentWidth += moves[i].length;
    }

    return result.join('');
  },

  move: function(move) {
    /* The move function can be called with in the following parameters:
     *
     * .move('Nxb7')      <- where 'move' is a case-sensitive SAN string
     *
     * .move({ from: 'h7', <- where the 'move' is a move object (additional
     *         to :'h8',      fields are ignored)
     *         promotion: 'q',
     *      })
     */
    var moveObj = null;
    var moves = this.generateMoves();

    if (typeof move === 'string') {
      /* convert the move string to a move object */
      /* strip off any move decorations: e.g Nf3+?! */
      var moveReplaced = move.replace(/[+#?!=]/, '');
      for (var i = 0, len = moves.length; i < len; i++) {
        if (moveReplaced === this.moveToSan(moves[i]).replace(/[+#?!=]/, '')) {
          moveObj = moves[i];
          break;
        }
      }
    } else if (typeof move === 'object') {
      /* convert the pretty move object to an ugly move object */
      for (var i = 0, len = moves.length; i < len; i++) {
        if (move.from === this.algebraic(moves[i].from) &&
            move.to === this.algebraic(moves[i].to) &&
            (!('promotion' in moves[i]) ||
             move.promotion === moves[i].promotion)) {
          moveObj = moves[i];
          break;
        }
      }
    }

    /* failed to find move */
    if (!moveObj) {
      return null;
    }

    /* need to make a copy of move because we can't generate SAN after the
     * move is made
     */
    var prettyMove = this.makePretty(moveObj);

    this.makeMove(moveObj);

    return prettyMove;
  },

  mask: function(str) {
    return str.replace(/\\/g, '\\');
  },

  getMoveObj: function(move) {
    return this.moveFromSan(this.trim(move));
  },

  hasKeys: function(object) {
    var hasKeys = false;
    for (var key in object) {
      hasKeys = true;
    }
    return hasKeys;
  },

  newlineChar: function(i) {
    return (typeof i === 'object' &&
                        typeof i.newlineChar === 'string') ?
        i.newlineChar : '\r?\n';
  },

  parsePgnHeader: function(header, options) {
    var newlineChar = this.newlineChar(options);
    var headerObj = {};
    var headers = header.split(new RegExp(this.mask(newlineChar)));
    var key = '';
    var value = '';

    for (var i = 0; i < headers.length; i++) {
      key = headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, '$1');
      value = headers[i].replace(/^\[[A-Za-z]+\s"(.*)"\]$/, '$1');
      if (this.trim(key).length > 0) {
        headerObj[key] = value;
      }
    }

    return headerObj;
  },

  loadPgn: function(pgn, options) {
    var newlineChar = this.newlineChar(options);
    var regex = new RegExp('^(\\[(.|' + this.mask(newlineChar) + ')*\\])' +
                           '(' + this.mask(newlineChar) + ')*' +
                           '1.(' + this.mask(newlineChar) + '|.)*$', 'g');

    /* get header part of the PGN file */
    var headerString = pgn.replace(regex, '$1');

    /* no info part given, begins with moves */
    if (headerString[0] !== '[') {
      headerString = '';
    }

    this.reset();

    /* parse PGN header */
    var headers = this.parsePgnHeader(headerString, options);
    for (var key in headers) {
      this.setHeader([key, headers[key]]);
    }

    /* delete header to get the moves */
    var ms = pgn.replace(headerString, '').replace(new RegExp(this.mask(newlineChar), 'g'), ' ');

    /* delete comments */
    ms = ms.replace(/(\{[^}]+\})+?/g, '');

    /* delete move numbers */
    ms = ms.replace(/\d+\./g, '');

    /* trim and get array of moves */
    var moves = this.trim(ms).split(new RegExp(/\s+/));

    /* delete empty entries */
    moves = moves.join(',').replace(/,,+/g, ',').split(',');
    var move = '';

    for (var halfMove = 0; halfMove < moves.length - 1; halfMove++) {
      move = this.getMoveObj(moves[halfMove]);

      /* move not possible! (don't clear the board to examine to show the
       * latest valid position)
       */
      if (move == null) {
        return false;
      } else {
        this.makeMove(move);
      }
    }

    /* examine last move */
    move = moves[moves.length - 1];
    if (POSSIBLE_RESULTS.indexOf(move) > -1) {
      if (this.hasKeys(this.header) && typeof this.header.Result === 'undefined') {
        this.setHeader(['Result', move]);
      }
    } else {
      move = this.getMoveObj(move);
      if (move == null) {
        return false;
      } else {
        this.makeMove(move);
      }
    }
    return true;
  },

  clone: function(obj) {
    var dupe = (obj instanceof Array) ? [] : {};

    for (var property in obj) {
      if (typeof property === 'object') {
        dupe[property] = this.clone(obj[property]);
      } else {
        dupe[property] = obj[property];
      }
    }

    return dupe;
  },

  /*****************************************************************************
   * DEBUGGING UTILITIES
   ****************************************************************************/
  perft: function(depth) {
    var moves = this.generateMoves({legal: false});
    var nodes = 0;
    var color = this.turn;

    for (var i = 0, len = moves.length; i < len; i++) {
      this.makeMove(moves[i]);
      if (!this.kingAttacked(color)) {
        if (depth - 1 > 0) {
          var childNodes = this.perft(depth - 1);
          nodes += childNodes;
        } else {
          nodes++;
        }
      }
      this.undoMove();
    }

    return nodes;
  },

  trim: function(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }
};

module.exports = Chess;

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

global.BLACK = 'b';
global.WHITE = 'w';

global.EMPTY = -1;

global.PAWN   = 'p';
global.KNIGHT = 'n';
global.BISHOP = 'b';
global.ROOK   = 'r';
global.QUEEN  = 'q';
global.KING   = 'k';

global.SYMBOLS  = 'pnbrqkPNBRQK';

global.DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

global.POSSIBLE_RESULTS = ['1-0', '0-1', '1/2-1/2', '*'];

global.PAWN_OFFSETS = {
  b: [16, 32, 17, 15],
  w: [-16, -32, -17, -15]
};

global.PIECE_OFFSETS = {
  n: [-18, -33, -31, -14,  18, 33, 31,  14],
  b: [-17, -15,  17,  15],
  r: [-16,   1,  16,  -1],
  q: [-17, -16, -15,   1,  17, 16, 15,  -1],
  k: [-17, -16, -15,   1,  17, 16, 15,  -1]
};

global.ATTACKS = [
  20,  0,  0,  0,  0,  0,  0, 24,  0,  0,  0,  0,  0,  0, 20, 0,
   0, 20,  0,  0,  0,  0,  0, 24,  0,  0,  0,  0,  0, 20,  0, 0,
   0,  0, 20,  0,  0,  0,  0, 24,  0,  0,  0,  0, 20,  0,  0, 0,
   0,  0,  0, 20,  0,  0,  0, 24,  0,  0,  0, 20,  0,  0,  0, 0,
   0,  0,  0,  0, 20,  0,  0, 24,  0,  0, 20,  0,  0,  0,  0, 0,
   0,  0,  0,  0,  0, 20,  2, 24,  2, 20,  0,  0,  0,  0,  0, 0,
   0,  0,  0,  0,  0,  2, 53, 56, 53,  2,  0,  0,  0,  0,  0, 0,
  24, 24, 24, 24, 24, 24, 56,  0, 56, 24, 24, 24, 24, 24, 24, 0,
   0,  0,  0,  0,  0,  2, 53, 56, 53,  2,  0,  0,  0,  0,  0, 0,
   0,  0,  0,  0,  0, 20,  2, 24,  2, 20,  0,  0,  0,  0,  0, 0,
   0,  0,  0,  0, 20,  0,  0, 24,  0,  0, 20,  0,  0,  0,  0, 0,
   0,  0,  0, 20,  0,  0,  0, 24,  0,  0,  0, 20,  0,  0,  0, 0,
   0,  0, 20,  0,  0,  0,  0, 24,  0,  0,  0,  0, 20,  0,  0, 0,
   0, 20,  0,  0,  0,  0,  0, 24,  0,  0,  0,  0,  0, 20,  0, 0,
  20,  0,  0,  0,  0,  0,  0, 24,  0,  0,  0,  0,  0,  0, 20
];

global.RAYS = [
   17,   0,   0,   0,   0,   0,   0,  16,   0,   0,   0,   0,   0,   0,  15, 0,
    0,  17,   0,   0,   0,   0,   0,  16,   0,   0,   0,   0,   0,  15,   0, 0,
    0,   0,  17,   0,   0,   0,   0,  16,   0,   0,   0,   0,  15,   0,   0, 0,
    0,   0,   0,  17,   0,   0,   0,  16,   0,   0,   0,  15,   0,   0,   0, 0,
    0,   0,   0,   0,  17,   0,   0,  16,   0,   0,  15,   0,   0,   0,   0, 0,
    0,   0,   0,   0,   0,  17,   0,  16,   0,  15,   0,   0,   0,   0,   0, 0,
    0,   0,   0,   0,   0,   0,  17,  16,  15,   0,   0,   0,   0,   0,   0, 0,
    1,   1,   1,   1,   1,   1,   1,   0,  -1,  -1,  -1,  -1,  -1,  -1,  -1, 0,
    0,   0,   0,   0,   0,   0, -15, -16, -17,   0,   0,   0,   0,   0,   0, 0,
    0,   0,   0,   0,   0, -15,   0, -16,   0, -17,   0,   0,   0,   0,   0, 0,
    0,   0,   0,   0, -15,   0,   0, -16,   0,   0, -17,   0,   0,   0,   0, 0,
    0,   0,   0, -15,   0,   0,   0, -16,   0,   0,   0, -17,   0,   0,   0, 0,
    0,   0, -15,   0,   0,   0,   0, -16,   0,   0,   0,   0, -17,   0,   0, 0,
    0, -15,   0,   0,   0,   0,   0, -16,   0,   0,   0,   0,   0, -17,   0, 0,
  -15,   0,   0,   0,   0,   0,   0, -16,   0,   0,   0,   0,   0,   0, -17
];

global.SHIFTS = {p: 0, n: 1, b: 2, r: 3, q: 4, k: 5};

global.FLAGS = {
  NORMAL: 'n',
  CAPTURE: 'c',
  BIG_PAWN: 'b',
  EP_CAPTURE: 'e',
  PROMOTION: 'p',
  KSIDE_CASTLE: 'k',
  QSIDE_CASTLE: 'q'
};

global.BITS = {
  NORMAL: 1,
  CAPTURE: 2,
  BIG_PAWN: 4,
  EP_CAPTURE: 8,
  PROMOTION: 16,
  KSIDE_CASTLE: 32,
  QSIDE_CASTLE: 64
};

global.RANK_1 = 7;
global.RANK_2 = 6;
global.RANK_3 = 5;
global.RANK_4 = 4;
global.RANK_5 = 3;
global.RANK_6 = 2;
global.RANK_7 = 1;
global.RANK_8 = 0;

global.SQUARES = {
  a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
  a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
  a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
  a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
  a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
  a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
  a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
  a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
};

global.ROOKS = {
  w: [{square: SQUARES.a1, flag: BITS.QSIDE_CASTLE},
      {square: SQUARES.h1, flag: BITS.KSIDE_CASTLE}],
  b: [{square: SQUARES.a8, flag: BITS.QSIDE_CASTLE},
      {square: SQUARES.h8, flag: BITS.KSIDE_CASTLE}]
};

global.ERRORS = {
  0:  'No errors.',
  1:  'FEN string must contain six space-delimited fields.',
  2:  '6th field (move number) must be a positive integer.',
  3:  '5th field (half move counter) must be a non-negative integer.',
  4:  '4th field (en-passant square) is invalid.',
  5:  '3rd field (castling availability) is invalid.',
  6:  '2nd field (side to move) is invalid.',
  7:  '1st field (piece positions) does not contain 8 \'/\'-delimited rows.',
  8:  '1st field (piece positions) is invalid [consecutive numbers].',
  9:  '1st field (piece positions) is invalid [invalid piece].',
  10: '1st field (piece positions) is invalid [row too large].',
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
'use strict';
/*
 * Copyright (c) 2015, Jeff Hlywa (jhlywa@gmail.com)
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
 *----------------------------------------------------------------------------*/

require('./globals');

var Chess = require('./chess');
var api   = require('./api');

module.exports = function(fen) {
  return new api(new Chess(fen));
};

},{"./api":1,"./chess":2,"./globals":3}]},{},[4])(4)
});