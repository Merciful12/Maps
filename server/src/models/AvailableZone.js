'use strict'

const sequelize = require('utils/sequelize')
const Sequelize = require('sequelize')

const Marker = require('./Marker')

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

AvailableZone.hasMany(Marker, { foreignKey: 'zoneId' })

module.exports = AvailableZone
