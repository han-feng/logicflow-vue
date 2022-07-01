import { defineConfig } from 'cypress'

export default defineConfig({
  viewportHeight: 768,
  viewportWidth: 1024,
  fixturesFolder: false,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:4173',
    supportFile: false,
  },
})
