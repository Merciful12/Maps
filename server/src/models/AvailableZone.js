'use strict'

const sequelize = require('utils/sequelize')
const Sequelize = require('sequelize')

const schema = {
  lat: {
    type: Sequelize.DOUBLE
  },
  lng: {
    type: Sequelize.DOUBLE
  },
  radius: {
    type: Sequelize.DOUBLE
  }
}

const options = {}

const AvailableZone = sequelize.define('AvailableZone', schema, options)

module.exports = AvailableZone
