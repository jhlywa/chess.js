import { readFileSync } from 'fs'
import { join } from 'path'

export function split(s: string) {
  return s.split(/\s+|\n/)
}

export function fileToString(filename: string) {
  // POSIX 3.206 defines a line as `a sequence of zero or more non- <newline>
  // characters plus a terminating <newline> character`, so strip the trailing
  // newline after reading (w/ slice).
  return readFileSync(join(__dirname, './', filename)).toString().slice(0, -1)
}
