import fs from 'fs'
import path from 'path'
import { Bench } from 'tinybench'
import { Chess } from '../dist/esm/chess'

// Load the PGNs into memory
const file = fs.readFileSync(path.join(__dirname, '/benchmark.pgn'), 'utf8')

const games = file
  .split(/^\[Event /m)
  .filter((p) => p.trim() != '')
  .map((p) => '[Event ' + p)

// Run the benchmark
const bench = new Bench({
  name: 'chess.js benchmark',
  iterations: 30,
  time: 15,
})

const chess = new Chess()

bench.add('loadPgn', () => {
  for (const game of games) {
    chess.loadPgn(game)
  }
})

bench.run().then(() => {
  for (const task of bench.tasks) {
    console.log(task.name)
    const result = task.result
    if (!result) {
      console.log('No result')
      continue
    }

    const avg = result.latency.mean.toFixed(2)
    const moe = result.latency.rme.toFixed(2)
    const min = result.latency.min.toFixed(2)
    const max = result.latency.max.toFixed(2)
    const total = (result.totalTime / 1000).toFixed(2)

    console.log(`Avg: ${avg}ms ± ${moe}%`)
    console.log(`Min: ${min}ms`)
    console.log(`Max: ${max}ms`)
    console.log(`Samples: ${result.samples.length}`)
    console.log(`Total time: ${total}s`)
  }
})
