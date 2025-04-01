import { readFileSync } from 'fs'
import { join } from 'path'

export function split(s: string) {
  return s.split(/\s+|\n/)
}

export function diffChars(str1: string, str2: string) {
  let diff = ''
  const maxLength = Math.max(str1.length, str2.length)

  for (let i = 0; i < maxLength; i++) {
    if (str1[i] !== str2[i]) {
      diff += `(${str1[i] || ''} -> ${str2[i] || ''})`
    }
  }
  return diff
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

export const SEVEN_TAG_ROSTER_STRING = `[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]
`
