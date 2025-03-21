import Xiangqi from '../src/chess';
import { describe, it, expect } from 'vitest';

describe('generate valid fen', () => {
  it('should generate a valid initial FEN string', () => {
    const xiangqi = new Xiangqi();
    const s = xiangqi.exportFen();
    expect(s).toBe(
      'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w 0',
    );
  });
});
