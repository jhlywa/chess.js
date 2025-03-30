import { readFileSync } from 'fs'
import { join } from 'path'

export function split(s: string) {
  return s.split(/\s+|\n/)
}

export function fileToString(filename: string) {
  /*
   * POSIX 3.206 defines a line as `a sequence of zero or more non- <newline>
   * characters plus a terminating <newline> character`, so strip the trailing
   * newline after reading (w/ slice).
   */
  return readFileSync(join(__dirname, './', filename))
    .toString()
    .slice(0, -1)
}

export const SEVEN_TAG_ROSTER_STRING = `
[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]
`
export const SEVEN_TAG_ROSTER_HTML = `
[Event \"?\"]<br />[Site \"?\"]<br />[Date \"????.??.??\"]<br />[Round \"?\"]<br />[White \"?\"]<br />[Black \"?\"]<br />[Result \"*\"]
`