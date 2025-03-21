export type Result = {
  ok: boolean;
  message?: string;
};

export default class Xiangqi {
  private board: string[][] = [];
  private currentPlayer: 'w' | 'b' = 'w'; // 'w' for red, 'b' for black
  private moveCount: number = 0;

  /**
   * Initialize a Xiangqi game from FEN notation
   * @param fen - Forsyth-Edwards Notation string for Xiangqi
   */
  constructor(
    fen: string = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w 0',
  ) {
    this.parseFen(fen);
  }

  boardAsStr(): string {
    let s = '';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 9; j++) {
        s += this.board[i][j] || '.';
      }
      s += '\n';
    }
    // remove last newline
    return s.trim();
  }

  /**
   * Parse FEN string and setup the board
   * @param fen - Forsyth-Edwards Notation string
   */
  private parseFen(fen: string): void {
    const parts = fen.trim().split(' ');
    const boardPart = parts[0];
    this.currentPlayer = parts[1] as 'w' | 'b';
    this.moveCount = parseInt(parts[2] || '0', 10);

    // Initialize empty board (10x9)
    this.board = Array(10)
      .fill(null)
      .map(() => Array(9).fill(''));

    // Parse board layout
    const rows = boardPart.split('/');
    for (let i = 0; i < 10; i++) {
      let col = 0;
      for (let j = 0; j < rows[i].length; j++) {
        const char = rows[i][j];
        if (/\d/.test(char)) {
          // If it's a number, skip that many columns
          col += parseInt(char, 10);
        } else {
          // Place the piece
          this.board[i][col] = char;
          col++;
        }
      }
    }
  }

  /**
   * Export the current board state to FEN notation
   * @returns FEN string
   */
  exportFen(): string {
    const rows: string[] = [];

    // Process board state
    for (let i = 0; i < 10; i++) {
      let row = '';
      let emptyCount = 0;

      for (let j = 0; j < 9; j++) {
        if (this.board[i][j] === '') {
          emptyCount++;
        } else {
          if (emptyCount > 0) {
            row += emptyCount.toString();
            emptyCount = 0;
          }
          row += this.board[i][j];
        }
      }

      if (emptyCount > 0) {
        row += emptyCount.toString();
      }

      rows.push(row);
    }

    return `${rows.join('/')} ${this.currentPlayer} ${this.moveCount}`;
  }

  /**
   * Convert chess notation (e.g. 'e4') to board coordinates [row, col]
   * @param position - Chess notation position
   * @returns Board coordinates [row, col]
   */
  private positionToCoordinates(position: string): [number, number] {
    if (position.length < 2) {
      throw new Error(`Invalid position: ${position}`);
    }

    const col = position.charCodeAt(0) - 'a'.charCodeAt(0);
    const row = 9 - (parseInt(position.substring(1), 10) - 1);

    if (col < 0 || col > 8 || row < 0 || row > 9) {
      throw new Error(`Position out of bounds: ${position}`);
    }

    return [row, col];
  }

  /**
   * Check if a move is legal
   * This is a simplified implementation and doesn't check all Xiangqi rules
   * @param fromCoords - Starting coordinates [row, col]
   * @param toCoords - Target coordinates [row, col]
   * @returns Boolean indicating if move is legal
   */
  isLegalMove(
    fromCoords: [number, number],
    toCoords: [number, number],
  ): Result {
    const [fromRow, fromCol] = fromCoords;
    const [toRow, toCol] = toCoords;

    if (fromRow === toRow && fromCol === toCol) {
      return { ok: false, message: "Can't move to the same position." };
    }

    const piece = this.board[fromRow][fromCol];
    if (!piece) {
      return { ok: false, message: 'No piece at the starting position.' };
    }

    const isPieceRed = piece === piece.toUpperCase();
    if (
      (isPieceRed && this.currentPlayer !== 'w') ||
      (!isPieceRed && this.currentPlayer !== 'b')
    ) {
      return { ok: false, message: "Not the current player's piece." };
    }

    const targetPiece = this.board[toRow][toCol];
    if (targetPiece) {
      const isTargetRed = targetPiece === targetPiece.toUpperCase();
      if ((isPieceRed && isTargetRed) || (!isPieceRed && !isTargetRed)) {
        return { ok: false, message: "Can't capture own piece." };
      }
    }

    return { ok: true };
  }

  /**
   * Make a move on the board
   * @param move - Object containing from and to positions
   * @returns Boolean indicating if the move was successful
   */
  move({ from, to }: { from: string; to: string }): boolean {
    const fromCoords = this.positionToCoordinates(from);
    const toCoords = this.positionToCoordinates(to);

    const checkResult = this.isLegalMove(fromCoords, toCoords);
    if (!checkResult.ok) {
      console.error(checkResult.message);
      throw new Error(`Invalid move: ${from} -> ${to}`);
    }

    // Make the move
    const [fromRow, fromCol] = fromCoords;
    const [toRow, toCol] = toCoords;

    this.board[toRow][toCol] = this.board[fromRow][fromCol];
    this.board[fromRow][fromCol] = '';

    // Update player and move count
    this.currentPlayer = this.currentPlayer === 'w' ? 'b' : 'w';
    this.moveCount++;

    return true;
  }

  /**
   * Get the current game state
   * @returns Object containing current player and board state
   */
  getState(): {
    currentPlayer: 'w' | 'b';
    board: string[][];
    moveCount: number;
  } {
    return {
      currentPlayer: this.currentPlayer,
      board: this.board.map((row) => [...row]), // Return a copy of the board
      moveCount: this.moveCount,
    };
  }

  isCheckmate(color: "w" | "b" = "w"): boolean {
    // ANH LÀM Ở ĐÂY!!!!!!!!!
    throw new Error('Not implemented');
  }

  isGameOver(): boolean {
    // ANH LÀM Ở ĐÂY!!!!!!!!!
    throw new Error('Not implemented');
  }

  isInCheck(color: "w" | "b" = "w"): boolean {
    // ANH LÀM Ở ĐÂY!!!!!!!!!
    throw new Error('Not implemented');
  }

  isStalemate(color: "w" | "b" = "w"): boolean {
    // ANH LÀM Ở ĐÂY!!!!!!!!!
    throw new Error('Not implemented');
  }

  getWinner(): "w" | "b" | null {
    // ANH LÀM Ở ĐÂY!!!!!!!!!
    throw new Error('Not implemented');
  }
}
