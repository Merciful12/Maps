'use strict'

const sequelize = require('utils/sequelize')
const { app: logger } = require('utils/logger')

const initializerModels = async () => {
  logger.info('initializerModels')

  require('models')
  await sequelize.sync({force: true})

  logger.info('initializerModels -> done')
}

module.exports = initializerModels
