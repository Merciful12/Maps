'use strict'

require('app-module-path').addPath(__dirname)

const Express = require('express')
const {
  initializerModels,
  initializerSeed,
  initializerSequelize
} = require('initializers')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('config/config')

const main = async () => {
  console.log('main')
  const app = new Express()
  app.use(morgan('combined'))
  app.use(bodyParser.json())
  app.use(cors())

  require('./routes')(app)

  await initializerSequelize()
  await initializerModels()
  await initializerSeed()

  await new Promise((resolve, reject) => app
    .listen(config.port, resolve)
    .on('error', reject))

  console.log('main -> done')
}
main().catch(console.error)
