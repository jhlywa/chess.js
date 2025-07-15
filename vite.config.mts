import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,ts}'],
      exclude: ['src/pgn.js'],
    },
  },
})
