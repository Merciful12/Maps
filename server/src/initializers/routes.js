'use strict'

const controllers = require('controllers')
const config = require('config')
const { app: logger } = require('utils/logger')

const initializerRoutes = (app) => {
  const apiConfig = config.get('api')
  logger.info('initializerRoutes %j', apiConfig)

  const apiUrlV1 = `${apiConfig.base}${apiConfig.v1}`
  Object.entries(controllers)
    .forEach(([ name, routeHandler ]) => {
      app.route.use(`${apiUrlV1}/${name}`, routeHandler)
      logger.info(`initializerRoutes -> route added: ${apiUrlV1}/${name}`)
    })

  logger.info('initializerRoutes -> done')
}

module.exports = initializerRoutes
