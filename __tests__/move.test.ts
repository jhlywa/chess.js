import Xiangqi from '../src/chess';
import { describe, expect, it } from 'vitest';
import { boardStrToFen } from './utils';
import dedent from 'dedent';

describe('Xiangqi', () => {
  describe('initial board setup', () => {
    it('should export correct board initially', () => {
      const xiangqi = new Xiangqi();
      const s = xiangqi.boardAsStr();
      const expected = dedent`
        rnbakabnr
        .........
        .c.....c.
        p.p.p.p.p
        .........
        .........
        P.P.P.P.P
        .C.....C.
        .........
        RNBAKABNR`;
      expect(s).toBe(expected);
    });
  });

  describe('Soldier/Pawn movement', () => {
    it('should allow correct pawn move forward', () => {
      const xiangqi = new Xiangqi();
      xiangqi.move({ from: 'a4', to: 'a5' });
      const s = xiangqi.boardAsStr();
      const expected = dedent`
        rnbakabnr
        .........
        .c.....c.
        p.p.p.p.p
        .........
        P........
        ..P.P.P.P
        .C.....C.
        .........
        RNBAKABNR`;
      expect(s).toBe(expected);
    });

    it('should allow soldier to move horizontally after crossing river', () => {
      const fen = boardStrToFen(dedent`
        rnbakabnr
        .........
        .c.....c.
        P.p.p.p.p
        .........
        .........
        ..P.P.P.P
        .C.....C.
        .........
        RNBAKABNR`);
      const xiangqi = new Xiangqi(fen);
      xiangqi.move({ from: 'a7', to: 'b7' });

      const s = xiangqi.boardAsStr();
      const expected = dedent`
        rnbakabnr
        .........
        .c.....c.
        .Pp.p.p.p
        .........
        .........
        ..P.P.P.P
        .C.....C.
        .........
        RNBAKABNR`;
      expect(s).toBe(expected);
    });

    it('should throw error for invalid pawn backward move', () => {
      const xiangqi = new Xiangqi();
      expect(() => xiangqi.move({ from: 'a4', to: 'a3' })).toThrowError(
        'Invalid move: a4 -> a3',
      );
    });

    it('should throw error for invalid pawn diagonal move', () => {
      const xiangqi = new Xiangqi();
      expect(() => xiangqi.move({ from: 'a4', to: 'b5' })).toThrowError(
        'Invalid move: a7 -> b6',
      );
    });

    it('should throw error for pawn horizontal move before crossing river', () => {
      const xiangqi = new Xiangqi();
      expect(() => xiangqi.move({ from: 'a4', to: 'b4' })).toThrowError(
        'Invalid move: a7 -> b7',
      );
    });
  });

  describe('Chariot/Rook movement', () => {
    it('should allow chariot to move vertically', () => {
      const xiangqi = new Xiangqi();
      xiangqi.move({ from: 'a1', to: 'a2' });
      const s = xiangqi.boardAsStr();
      const expected = dedent`
        rnbakabnr
        .........
        .c.....c.
        p.p.p.p.p
        .........
        .........
        P.P.P.P.P
        .C.....C.
        R........
        .NBAKABNR`;
      expect(s).toBe(expected);
    });

    it('should allow chariot to move horizontally', () => {
      const xiangqi = new Xiangqi();
      // Move pawn to clear path
      xiangqi.move({ from: 'a1', to: 'a2' });
      xiangqi.move({ from: 'a10', to: 'a9' });
      // Now move chariot horizontally
      xiangqi.move({ from: 'a2', to: 'i2' });

      const s = xiangqi.boardAsStr();
      const expected = dedent`
        .nbakabnr
        r........
        .c.....c.
        p.p.p.p.p
        .........
        .........
        P.P.P.P.P
        .C.....C.
        ........R
        .NBAKABNR`;
      expect(s).toBe(expected);
    });

    it('should allow chariot to capture opponent piece', () => {
      const fen = boardStrToFen(dedent`
        rnbakabnr
        .........
        .c.....c.
        p.p.p.p.p
        .........
        R........
        P.P.P.P.P
        .C.....C.
        .........
        .NBAKABNR`);
      const xiangqi = new Xiangqi(fen);
      xiangqi.move({ from: 'a5', to: 'a7' });

      const s = xiangqi.boardAsStr();
      const expected = dedent`
        rnbakabnr
        .........
        .c.....c.
        R.p.p.p.p
        .........
        .........
        P.P.P.P.P
        .C.....C.
        .........
        .NBAKABNR`;
      expect(s).toBe(expected);
    });

    it('should throw error when chariot tries to jump over pieces', () => {
      const xiangqi = new Xiangqi();
      expect(() => xiangqi.move({ from: 'a1', to: 'a10' })).toThrowError(
        'Invalid move: a1 -> a10',
      );
    });
  });

  describe('Horse/Knight movement', () => {
    it('should allow horse to move in L-shape', () => {
      const xiangqi = new Xiangqi();
      // Move pawn to make way for horse
      xiangqi.move({ from: 'b7', to: 'b6' });
      xiangqi.move({ from: 'h4', to: 'h5' });
      // Now move horse
      xiangqi.move({ from: 'b10', to: 'c8' });

      const s = xiangqi.boardAsStr();
      const expected = dedent`
        r.bakabnr
        .........
        .c.n...c.
        p.p.p.p.p
        .......p.
        .P.......
        P.P.P.P.P
        .C.....C.
        .........
        RNBAKABNR`;
      expect(s).toBe(expected);
    });

    it('should throw error when horse is blocked (horse leg rule)', () => {
      const xiangqi = new Xiangqi();
      expect(() => xiangqi.move({ from: 'b10', to: 'c8' })).toThrowError(
        'Invalid move: b10 -> c8',
      );
    });
  });

  describe('Elephant movement', () => {
    it('should allow elephant to move diagonally', () => {
      const xiangqi = new Xiangqi();
      // Move pawn to clear path
      xiangqi.move({ from: 'd7', to: 'd6' });
      xiangqi.move({ from: 'h4', to: 'h5' });
      // Now move elephant
      xiangqi.move({ from: 'c10', to: 'e8' });

      const s = xiangqi.boardAsStr();
      const expected = dedent`
        rn.akabnr
        .........
        .c.b...c.
        p.p.p.p.p
        .......p.
        ...P.....
        P.P.P.P.P
        .C.....C.
        .........
        RNBAKABNR`;
      expect(s).toBe(expected);
    });

    it('should throw error when elephant tries to cross river', () => {
      const xiangqi = new Xiangqi();
      // Setup a position where elephant is at the edge of river
      xiangqi.move({ from: 'd7', to: 'd6' });
      xiangqi.move({ from: 'h4', to: 'h5' });
      xiangqi.move({ from: 'c10', to: 'e8' });
      xiangqi.move({ from: 'h5', to: 'h6' });
      xiangqi.move({ from: 'e8', to: 'c6' });
      xiangqi.move({ from: 'h6', to: 'h7' });

      // Now try to cross river
      expect(() => xiangqi.move({ from: 'c6', to: 'e4' })).toThrowError(
        'Invalid move: c6 -> e4',
      );
    });

    it('should throw error when elephant is blocked at the crossing point', () => {
      const xiangqi = new Xiangqi();
      // Setup a position where elephant is blocked
      xiangqi.move({ from: 'd7', to: 'd6' });
      xiangqi.move({ from: 'h4', to: 'h5' });
      xiangqi.move({ from: 'c10', to: 'e8' });
      xiangqi.move({ from: 'h5', to: 'h6' });
      // Place a piece at the crossing point
      xiangqi.move({ from: 'e7', to: 'e6' });
      xiangqi.move({ from: 'h6', to: 'h7' });
      xiangqi.move({ from: 'e6', to: 'd7' });
      xiangqi.move({ from: 'h7', to: 'h8' });

      // Now try to move through the blocked point
      expect(() => xiangqi.move({ from: 'e8', to: 'g6' })).toThrowError(
        'Invalid move: e8 -> g6',
      );
    });
  });

  describe('Advisor movement', () => {
    it('should allow advisor to move diagonally within palace', () => {
      const xiangqi = new Xiangqi();
      xiangqi.move({ from: 'd10', to: 'e9' });

      const s = xiangqi.boardAsStr();
      const expected = dedent`
        rnb.kabnr
        ....a....
        .c.....c.
        p.p.p.p.p
        .........
        .........
        P.P.P.P.P
        .C.....C.
        .........
        RNBAKABNR`;
      expect(s).toBe(expected);
    });

    it('should throw error when advisor tries to move outside palace', () => {
      const xiangqi = new Xiangqi();
      xiangqi.move({ from: 'd10', to: 'e9' });
      xiangqi.move({ from: 'e1', to: 'd2' });

      expect(() => xiangqi.move({ from: 'e9', to: 'f8' })).toThrowError(
        'Invalid move: e9 -> f8',
      );
    });
  });

  describe('General/King movement', () => {
    it('should allow general to move horizontally within palace', () => {
      const xiangqi = new Xiangqi();
      xiangqi.move({ from: 'e10', to: 'd10' });

      const s = xiangqi.boardAsStr();
      const expected = dedent`
        rnbk.abnr
        .........
        .c.....c.
        p.p.p.p.p
        .........
        .........
        P.P.P.P.P
        .C.....C.
        .........
        RNBAKABNR`;
      expect(s).toBe(expected);
    });

    it('should allow general to move vertically within palace', () => {
      const xiangqi = new Xiangqi();
      xiangqi.move({ from: 'e10', to: 'e9' });

      const s = xiangqi.boardAsStr();
      const expected = dedent`
        rnba.abnr
        ....k....
        .c.....c.
        p.p.p.p.p
        .........
        .........
        P.P.P.P.P
        .C.....C.
        .........
        RNBAKABNR`;
      expect(s).toBe(expected);
    });

    it('should throw error when general tries to move outside palace', () => {
      const xiangqi = new Xiangqi();
      xiangqi.move({ from: 'e10', to: 'e9' });
      xiangqi.move({ from: 'e1', to: 'e2' });
      xiangqi.move({ from: 'e9', to: 'e8' });

      expect(() => xiangqi.move({ from: 'e2', to: 'e3' })).toThrowError(
        'Invalid move: e2 -> e3',
      );
    });

    it('should throw error when general tries to move diagonally', () => {
      const xiangqi = new Xiangqi();
      expect(() => xiangqi.move({ from: 'e10', to: 'd9' })).toThrowError(
        'Invalid move: e10 -> d9',
      );
    });
  });

  describe('Cannon movement', () => {
    it('should allow cannon to move vertically', () => {
      const xiangqi = new Xiangqi();
      xiangqi.move({ from: 'b8', to: 'b6' });

      const s = xiangqi.boardAsStr();
      const expected = dedent`
        rnbakabnr
        .........
        .........
        p.p.p.p.p
        .........
        .C.......
        P.P.P.P.P
        .......C.
        .........
        RNBAKABNR`;
      expect(s).toBe(expected);
    });

    it('should allow cannon to move horizontally', () => {
      const xiangqi = new Xiangqi();
      xiangqi.move({ from: 'b8', to: 'e8' });

      const s = xiangqi.boardAsStr();
      const expected = dedent`
        rnbakabnr
        ....C....
        .......c.
        p.p.p.p.p
        .........
        .........
        P.P.P.P.P
        .......C.
        .........
        RNBAKABNR`;
      expect(s).toBe(expected);
    });

    it('should allow cannon to capture by jumping over exactly one piece', () => {
      const xiangqi = new Xiangqi();
      // Setup a position for cannon to capture
      xiangqi.move({ from: 'b8', to: 'b6' });
      xiangqi.move({ from: 'h3', to: 'h5' });
      xiangqi.move({ from: 'b6', to: 'b4' });
      xiangqi.move({ from: 'h5', to: 'h6' });
      xiangqi.move({ from: 'b4', to: 'b1' }); // Capture black's knight

      const s = xiangqi.boardAsStr();
      const expected = dedent`
        rnbakabnr
        .........
        .........
        p.p.p.p.p
        .........
        .........
        P.P.P.P.P
        .......C.
        .........
        RC.AKABNR`;
      expect(s).toBe(expected);
    });

    it('should throw error when cannon tries to capture without jumping', () => {
      const xiangqi = new Xiangqi();
      xiangqi.move({ from: 'b8', to: 'b5' });
      xiangqi.move({ from: 'b4', to: 'b5' }); // Move pawn to b5

      // Cannon should not be able to capture directly
      expect(() => xiangqi.move({ from: 'b5', to: 'b4' })).toThrowError(
        'Invalid move: b5 -> b4',
      );
    });

    it('should throw error when cannon tries to jump over more than one piece', () => {
      const xiangqi = new Xiangqi();
      // Setup a position with multiple pieces in a row
      xiangqi.move({ from: 'c7', to: 'c6' });
      xiangqi.move({ from: 'c4', to: 'c5' });
      xiangqi.move({ from: 'c6', to: 'c5' });
      xiangqi.move({ from: 'h4', to: 'h5' });
      xiangqi.move({ from: 'b8', to: 'c8' });
      xiangqi.move({ from: 'h5', to: 'h6' });
      xiangqi.move({ from: 'c8', to: 'c6' });
      xiangqi.move({ from: 'h6', to: 'h7' });
      xiangqi.move({ from: 'c6', to: 'c5' });

      // Try to capture after jumping over two pieces
      expect(() => xiangqi.move({ from: 'c5', to: 'c1' })).toThrowError(
        'Invalid move: c5 -> c1',
      );
    });
  });

  describe('Special rules', () => {
    it('should detect flying general rule violation', () => {
      // Setup a position where generals face each other
      // This would require custom board setup
      // Mock test for flying general rule
      const fen = boardStrToFen(dedent`
        ........r
        .........
        .........
        .........
        .........
        ....k....
        .........
        .........
        .........
        ....K....`);
      const mockXiangqi = new Xiangqi(fen);
      // Assume we have a method to set custom positions

      expect(() => mockXiangqi.move({ from: 'e6', to: 'e5' })).toThrowError(
        'Invalid move: flying general rule violation',
      );
    });

    it('should correctly handle checkmate scenarios', () => {
      const fen = boardStrToFen(dedent`
        R...k....
        ........R
        .........
        .........
        .........
        .........
        .........
        .........
        .........
        .....K...`);

      // This would require a more complex setup
      // Mock test for checkmate detection
      const mockXiangqi = new Xiangqi(fen);
      // Assume we have a method to set custom positions for a checkmate position

      expect(mockXiangqi.isCheckmate()).toBe(true);
    });
  });
  describe('Pinning', () => {
    it('should prevent pinned piece from moving illegally and exposing king to check', () => {
      const fen = boardStrToFen(dedent`
      r.b.k..r
      ........
      .c.....c
      p.p.p.p.p
      ........
      ........
      P.P.P.P.P
      .C.....C
      ........
      RNB.K..R`);
      const xiangqi = new Xiangqi(fen);

      // Attempt to move the pinned bishop which would expose king to check
      expect(() => xiangqi.move({ from: 'c10', to: 'e8' })).toThrowError(
        'Invalid move: cannot expose king to check',
      );

      // Attempt to move horse which would expose king to check
      expect(() => xiangqi.move({ from: 'b1', to: 'c3' })).toThrowError(
        'Invalid move: cannot expose king to check',
      );

      // Moving within the line of pin (staying on the same file) should be allowed
      expect(() => xiangqi.move({ from: 'c10', to: 'c8' })).not.toThrow();
    });

    it('should allow pinned piece to capture the attacking piece', () => {
      const fen = boardStrToFen(dedent`
      r.b.k..r
      ........
      .c.....c
      p.p.p.p.p
      ........
      ..R.....
      P.P.P.P.P
      .C.....C
      ........
      RNB.K..R`);
      const xiangqi = new Xiangqi(fen);

      // Pinned bishop can capture the pinning piece
      expect(() => xiangqi.move({ from: 'c10', to: 'c6' })).not.toThrow();

      const expected = dedent`
      r...k..r
      ........
      .b.....c
      p.p.p.p.p
      ........
      ........
      P.P.P.P.P
      .C.....C
      ........
      RNB.K..R`;
      expect(xiangqi.boardAsStr()).toBe(expected);
    });

    it('should handle complex pinning scenarios with multiple pieces', () => {
      const fen = boardStrToFen(dedent`
      ....k...
      ........
      ........
      ..p.....
      ..N.....
      ..B.....
      ........
      ........
      ..r.....
      ....K...`);
      const xiangqi = new Xiangqi(fen);

      // Horse is pinned by rook through bishop
      expect(() => xiangqi.move({ from: 'c4', to: 'e5' })).toThrowError(
        'Invalid move: cannot expose king to check',
      );

      // Bishop is pinned and cannot move out of line
      expect(() => xiangqi.move({ from: 'c3', to: 'd4' })).toThrowError(
        'Invalid move: cannot expose king to check',
      );

      // Bishop can move along the pin line
      expect(() => xiangqi.move({ from: 'c3', to: 'c2' })).not.toThrow();
    });
  });

  describe('King Must Move - Check and Fork', () => {
    it('should force king to move when in direct check', () => {
      const fen = boardStrToFen(dedent`
      r.b.k..r
      ........
      .c.....c
      p.p.p.p.p
      ........
      ........
      P.P.P.P.P
      .C.....C
      ....R...
      RNB.K..R`);
      const xiangqi = new Xiangqi(fen);

      // King is in check by rook
      // Ensure that king must move to escape check
      expect(() => xiangqi.move({ from: 'e1', to: 'd1' })).not.toThrow();

      // Reset game state
      const newXiangqi = new Xiangqi(fen);

      // Other moves should fail when king is in check
      expect(() => newXiangqi.move({ from: 'a1', to: 'a2' })).toThrowError(
        'King is in check: must move king or block check',
      );

      // A piece that blocks the check should be allowed to move
      expect(() => newXiangqi.move({ from: 'c1', to: 'e2' })).not.toThrow();
    });

    it('should allow pieces to capture the checking piece to resolve check', () => {
      const fen = boardStrToFen(dedent`
      r.b.k..r
      ........
      .c.....c
      p.p.p.p.p
      ........
      ........
      P.P.P.P.P
      .C.....C
      ....R...
      RNB.K..R`);
      const xiangqi = new Xiangqi(fen);

      // Cannon can capture the checking rook
      expect(() => xiangqi.move({ from: 'b2', to: 'e2' })).not.toThrow();

      const expected = dedent`
      r.b.k..r
      ........
      .c.....c
      p.p.p.p.p
      ........
      ........
      P.P.P.P.P
      .....C.C
      ........
      RNB.K..R`;
      expect(xiangqi.boardAsStr()).toBe(expected);
    });

    it('should not allow non-king pieces to move when king is in check unless they resolve the check', () => {
      const fen = boardStrToFen(dedent`
      r.b.k..r
      ........
      .c.....c
      p.p.p.p.p
      ........
      ....r...
      P.P.P.P.P
      .C.....C
      ........
      RNB.K..R`);
      const xiangqi = new Xiangqi(fen);

      // Moving a piece that does not resolve check is invalid
      expect(() => xiangqi.move({ from: 'a1', to: 'a2' })).toThrowError(
        'King is in check: must move king or block check',
      );

      // Moving a piece to block the check should be valid
      expect(() => xiangqi.move({ from: 'c1', to: 'e3' })).not.toThrow();

      // Reset game state
      const newXiangqi = new Xiangqi(fen);

      // Moving advisor to protect king should be valid
      expect(() => newXiangqi.move({ from: 'd1', to: 'e2' })).not.toThrow();
    });

    it('should force king to move when under a double check (fork)', () => {
      const fen = boardStrToFen(dedent`
      r.b.k..r
      ........
      .c.....c
      p.p.p.p.p
      ........
      ....r...
      P.P.P.P.P
      .C.....C
      .....R..
      RNB.K..R`);
      const xiangqi = new Xiangqi(fen);

      // Ensure that ONLY king can move during double check
      expect(() => xiangqi.move({ from: 'e1', to: 'd1' })).not.toThrow();

      // Reset game state
      const newXiangqi = new Xiangqi(fen);

      // No other piece can resolve a double check by moving
      expect(() => newXiangqi.move({ from: 'a1', to: 'a2' })).toThrowError(
        'King is in double check: king must move',
      );

      expect(() => newXiangqi.move({ from: 'c1', to: 'e3' })).toThrowError(
        'King is in double check: king must move',
      );

      // King can move to safety
      expect(() => newXiangqi.move({ from: 'e1', to: 'f1' })).not.toThrow();
    });

    it('should handle cannon-delivered check correctly', () => {
      const fen = boardStrToFen(dedent`
      r.b.k..r
      ........
      .c.....c
      p.p.p.p.p
      ........
      ........
      P.P.P.P.P
      .C.....C
      ..P.....
      RNB.K..R`);
      const xiangqi = new Xiangqi(fen);

      // Move cannon to deliver check by jumping over pawn
      xiangqi.move({ from: 'b2', to: 'e2' });

      // King must move to resolve check
      expect(() => xiangqi.move({ from: 'e10', to: 'd10' })).not.toThrow();

      // Moving pawn does not resolve the check (the jumping piece)
      const newXiangqi = new Xiangqi(
        boardStrToFen(dedent`
        r.b.k..r
        ........
        .c.....c
        p.p.p.p.p
        ........
        ........
        P.P.P.P.P
        ...C...C
        ..P.....
        RNB.K..R`),
      );

      expect(() => newXiangqi.move({ from: 'c2', to: 'c3' })).toThrowError(
        'King is in check: must move king or block check',
      );
    });
  });

  describe('Check prevention and detection', () => {
    it('should detect when king is in check', () => {
      const fen = boardStrToFen(dedent`
      r.b.k..r
      ........
      .c.....c
      p.p.p.p.p
      ........
      ........
      P.P.P.P.P
      .C.....C
      ....R...
      RNB.K..R`);
      const xiangqi = new Xiangqi(fen);

      expect(xiangqi.isInCheck('w')).toBe(true);
      expect(xiangqi.isInCheck('b')).toBe(false);
    });

    it('should prevent moves that would put own king in check', () => {
      const fen = boardStrToFen(dedent`
      r.b.k..r
      ........
      .c.....c
      p.p.p.p.p
      ........
      ..R.....
      P.P.P.P.P
      .C.....C
      ........
      RNB.K..R`);
      const xiangqi = new Xiangqi(fen);

      // Moving the king into check should be invalid
      expect(() => xiangqi.move({ from: 'e1', to: 'e2' })).toThrowError(
        'Invalid move: would put king in check',
      );

      // Moving a piece that exposes king to check should be invalid
      expect(() => xiangqi.move({ from: 'd1', to: 'e2' })).toThrowError(
        'Invalid move: would put king in check',
      );
    });

    it('should detect checkmate correctly', () => {
      const fen = boardStrToFen(dedent`
      ....k...
      ....r...
      .......r
      ........
      ........
      ........
      ........
      ........
      ........
      ....K...`);
      const xiangqi = new Xiangqi(fen);

      // King is in checkmate with rooks at e9 and h7
      expect(xiangqi.isCheckmate('b')).toBe(true);
      expect(xiangqi.isCheckmate('w')).toBe(false);

      // Game should be over
      expect(xiangqi.isGameOver()).toBe(true);
      expect(xiangqi.getWinner()).toBe('red');
    });

    it('should handle stalemate correctly', () => {
      const fen = boardStrToFen(dedent`
      ..P.k.P.
      .......R
      ........
      ........
      ........
      ........
      ........
      ........
      ........
      .K......`, "b");
      const xiangqi = new Xiangqi(fen);

      // Black king has no legal moves but is not in check (stalemate)
      expect(xiangqi.isInCheck('b')).toBe(false);
      expect(xiangqi.isStalemate('b')).toBe(true);

      // Game should be over
      expect(xiangqi.isGameOver()).toBe(true);
      expect(xiangqi.getWinner()).toBe('draw');
    });
  });
});
