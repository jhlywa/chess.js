import { xoroshiro128 } from '../src/chess'

test('rand', () => {
  const rand = xoroshiro128(0xa187eb39cdcaed8f31c4b365b102e01en)

  const results = Array.from({ length: 5 }, () => rand().toString(16))

  // values take from reference implementation
  expect(results).toEqual([
    'c9c4700ec0b2a75c',
    'ce613bcab5ad7ec2',
    'd4abd9ddcd0a382b',
    '5f29a08525b0575f',
    'f6718179e0f7ba94',
  ])
})
