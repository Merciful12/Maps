'use strict'

const config = require('../config/config')
const Sequelize = require('sequelize')

module.exports = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)
