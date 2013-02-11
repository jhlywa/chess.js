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
      draggable: true,
      clickable: true,
      
      last_move: {},
      move_callback: function(){},

      /* internal flag to keep the user from clicking move while a piece
      *  is animating
      */
      busy: false,
      
    },

    _create: function() {
      this.element.addClass('chessboard-container');
      this.options.chess = Chess(this.options.fen);
      this.options.id = this.element.attr('id');
      this._render_board();
    },
    
    _post_render_options: function(){
      if (this.options.draggable){
        this._draggable(this);
      }
      if (this.options.clickable){
        this._clickable(this);
      }
      if (this.options.highlight){
        this._highlight_last();
      }
    },
    
    _highlight_last: function(){
      if (this.options.last_move){
        $('#'+this.options.id + '-' + this.options.last_move.from).addClass('last_move_from');
        $('#'+this.options.id + '-' + this.options.last_move.to).addClass('last_move_to');
      }
    },
    
    _clickable: function(widget) {
      $("[id^='"+widget.options.id+"-']").click(function(){
        var chess =  widget.options.chess;

        // If there's no previous click_move_from set, and chess.get returns
        // null, the user clicked an empty square.  Do nothing and return.
        if (! widget.click_move_from && chess.get($(this).data('square')) == null){
          return;
        }
        
        // If the clicked square matches the current turn color and click_move
        // from isn't set, set it and return
        if (!widget.click_move_from && chess.get($(this).data('square'))['color'] == chess.turn()){
          widget.click_move_from = $(this).data('square');
          $(this).addClass('click_move_from');
          return;
        }

        // if move_from is set, and the user clicks the same square, unset it
        if (widget.click_move_from == $(this).data('square')){
          widget.click_move_from = undefined;
          $(this).removeClass('click_move_from');
          
          return;
        }

        // If we got this far, execute move
        widget.move({
          from: widget.click_move_from,
          to: $(this).data('square'),
          promotion: 'q'
        });
        
        // reset click_move_from
        widget.click_move_from = undefined;
      });
    },

    _draggable: function(widget) {
      $("[data-game="+this.options.id+"]").each(function() {
        turn =  widget.options.chess.turn();
        piece_color = widget.options.chess.get($(this).parent().data('square'))['color'];
        
        if ( piece_color == turn){
          $(this).draggable();
        }
      });
      
      $("[id^='"+widget.options.id+"-']").droppable({
        accept: '.piece',
        hoverClass: 'hover',

        // Player has dropped a piece
        drop: function(event, ui) {
          widget.move({
            from: $(ui.draggable).parent().data('square'),
            to: $(this).data('square'),
            promotion: 'q'
          });
        },
      });      
    },

    _render_piece: function(piece, square) {
      var selector = '#' + this.options.id + '-' + square;
      return this._format("<div class='piece {0} {1}' data-game='{2}'></div>", 
                          piece.color + piece.type, this.options.theme.piece, this.options.id);
    },
    
    load_fen: function(new_fen) {
      this.options.chess = Chess(new_fen);
      this.options.fen = new_fen;

      this._render_board();
    },
    
    _render_board: function(){
      this.element.html(this._render_board_html());
      this.options.busy = false;
      
      if (this.options.draggable){
        this._draggable(this);
      }
      if (this.options.clickable){
        this._clickable(this);
      }
      if (this.options.highlight){
        this._highlight_last();
      }
    },

    _render_board_html: function() {
      var o = [];

      var flip = this.options.flip;
      var chess = this.options.chess;

      o.push(this._format("<div class='{0}'>", 'sq' + this.options.size));

      var squares = (flip) ? chess.SQUARES.slice().reverse() : chess.SQUARES;

      for (var i = 0; i < squares.length; i++) {
        var square = squares[i]; 
        var square_color = this.options.theme[chess.square_color(square)];

        o.push(this._format("<div id='{0}-{1}' data-square='{3}' class='square {2}'>",
                            this.options.id, square, square_color, square));

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
      this._render_board();
    },

    move: function(move) {
      var widget = this;
      var options = this.options;
      if (options.busy) {
        return;
      }
      options.busy = true;

      var move = this.options.chess.move(move);
      
      // if the move is invalid, reset
      if ( move == null){
        this._render_board();
        options.busy = false;
        
        return;
      }
      
      this.options.last_move.to = move.to;
      this.options.last_move.from = move.from;
      
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
          left: to.position().left, top: to.position().top},
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

            // rerender board html 
            widget._render_board();

            $(this).css({zindex: 1});
            options.busy = false;
            
            widget.options.move_callback();
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
