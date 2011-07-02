/*
 * Copyright (c) 2011, Jeff Hlywa (jhlywa@gmail.com)
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

(function($) {
  $.widget('cjs.chess', {
    options: {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      chess: new Chess(),
      size: 64,  /* valid range = 10 - 64 */
      theme: {piece: 'alpha', light: 'light', dark: 'dark'},
      flip: false,
      promotion: 'q',
      /* TODO: highlight_last_move: true */

      /* TODO: mode: 'playback', 'game' */
      /* TODO: movement: 'draggable', 'clickable', 'none' */

      /* internal flag to keep the user from clicking move while a piece
      *  is animating
      */
      busy: false,
      
    },

    _create: function() {
      this.element.addClass('chessboard-container');
      this.options.chess = Chess(this.options.fen);
      this.options.id = this.element.attr('id');
      this.element.html(this._render_board());
    },

    _render_piece: function(piece, square) {
      var selector = '#' + this.options.id + '-' + square;
      return this._format("<div class='piece {0} {1}'></div>", 
                          piece.color + piece.type, this.options.theme.piece);
    }, 

    _render_board: function() {
      var o = [];

      var flip = this.options.flip;
      var chess = this.options.chess;

      o.push(this._format("<div class='{0}'>", 'sq' + this.options.size));

      var squares = (flip) ? chess.SQUARES.slice().reverse() : chess.SQUARES;

      for (var i = 0; i < squares.length; i++) {
        var square = squares[i]; 
        var square_color = this.options.theme[chess.square_color(square)];

        o.push(this._format("<div id='{0}-{1}' class='square {2}'>",
                            this.options.id, square, square_color));

        /* place the piece if we have one */
        var piece = chess.get(square);
        if (piece) {
          o.push(this._render_piece(piece, square));
        }

        o.push('</div>');

        /* clear after drawing the last square in the rank */
        if ((flip && square[0] == 'a') || (!flip && square[0] == 'h')) {
          o.push("<div style='clear: both;'></div>");
        }

      }
      o.push('</div>');

      return o.join('\n');
    },

    flip: function() {
      this.options.flip = (this.options.flip) ? false : true;
      this.element.html(this._render_board());
    },

    /* TODO: allow for an optional callback that gets run after the move */
    move: function(move) {
      var options = this.options;
      if (options.busy) {
        return;
      }
      options.busy = true;


      var move = options.chess.move(move);
      var to = $('#' + options.id + '-' + move.to);
      var selector = '#' + options.id + '-' + move.from;
      var piece = $(selector).children().first();
      var size = piece.height();
      var position = piece.position();

      var castling = { 
        g8: {rook_from: options.id + '-h8', rook_to: options.id + '-f8'},
        g1: {rook_from: options.id + '-h1', rook_to: options.id + '-f1'},
        c8: {rook_from: options.id + '-a8', rook_to: options.id + '-d8'},
        c1: {rook_from: options.id + '-a1', rook_to: options.id + '-d1'},
      };

      piece.css({
        position: 'absolute',
        width: size,
        height: size,
        top: position.top,
        left: position.left,
        zindex: -1,
        }).animate({
          left: to.offset().left, top: to.offset().top}, 
          400,
          'swing',

          /* this function is run when the piece is finished moving */
          function() {
            /* if move is a capture */
            if (move.flags.match('c')) {
              to.children().remove();
            }

            /* if move is a promotion */
            if (move.flags.match('p')) {
              var new_piece = move.san.charAt(move.san.indexOf('=') + 1).toLowerCase();
              if ($(this).hasClass('wp')) {
                $(this).removeClass('wp').addClass('w' + new_piece);
              } else {
                $(this).removeClass('bp').addClass('b' + new_piece);
              }
            }

            $(this).appendTo(to);
        
            /* move the rook if we're castling */
            if (move.flags == 'k' || move.flags == 'q') {
              var to_id = move.to;
              var rook_from = castling[to_id]['rook_from'];
              var rook_to = castling[to_id]['rook_to'];
              $('#' + rook_from).children().remove().appendTo('#' + rook_to);
            }

            /* TODO: handle en passant */


          $(this).css({zindex: 1});
          options.busy = false;
        });
    },

    theme: function(new_theme) {
      var old_theme = this.options.theme.piece;
      $('#' + this.options.id + ' .piece').removeClass(old_theme).addClass(new_theme);
      this.options.theme.piece = new_theme;
    },


    _setOption: function(key, value) {
      if (key == 'size') {
        this.options.size = value;
        this.element.html(this._render_board());
      }
    },

    /* string construction helper */
    _format: function(s) {
      var args = arguments;
      for (var i = 1; i < args.length; i++) {
        s = s.replace('{' + (i - 1) + '}' , args[i]);
      }
      return s;
    },

    _dom_to_algebraic: function(sq) {
      var tokens = sq.split('-');
      return tokens[tokens.length - 1];
    },

  });

})(jQuery);
