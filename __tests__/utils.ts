import { readFileSync } from 'fs';
import { join } from 'path';

export function split(s: string) {
  return s.split(/\s+|\n/);
}

export function fileToString(filename: string) {
  // POSIX 3.206 defines a line as `a sequence of zero or more non- <newline>
  // characters plus a terminating <newline> character`, so strip the trailing
  // newline after reading (w/ slice).
  return readFileSync(join(__dirname, './', filename))
    .toString()
    .slice(0, -1);
}

/**
* Convert a FEN string to a board string
* @param fen FEN string
* @returns board string
*/
export function boardStrToFen(boardStr: string, player: 'w' | 'b' = 'w') {
  const rows = boardStr
    .split('\n')
    .map((row) => row.trim())
    .filter((row) => !!row);
  let fenRows = rows.map((row) => {
    return row.replace(/\.+/g, (match) => match.length.toString());
  });
  return fenRows.join('/') + ` ${player} 0`;
}
