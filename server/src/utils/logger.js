'use strict'

const winston = require('winston')
const config = require('config')

const loggerConfs = config.get('loggers')

const loggers = Object
  .entries(loggerConfs)
  .reduce(
    (accum, [ name, config ]) => {
      accum[name] = winston.createLogger(config)
      return accum
    }, {}
  )

module.exports = loggers
