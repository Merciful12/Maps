'use strict'

const sequelize = require('utils/sequelize')
const Sequelize = require('sequelize')

const User = require('./User')

const schema = {
  lat: {
    type: Sequelize.DOUBLE
  },
  lng: {
    type: Sequelize.DOUBLE
  }
}

const options = {}

const Marker = sequelize.define('Marker', schema, options)
Marker.belongsTo(User)

module.exports = Marker
