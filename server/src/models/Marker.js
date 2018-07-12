'use strict'

const User = require('./User')
const sequelize = require('utils/sequelize')
const Sequelize = require('sequelize')

const schema = {
  lat: {
    type: Sequelize.STRING
  },
  lng: {
    type: Sequelize.STRING
  }
}

const Marker = sequelize.define('Marker', schema)
Marker.belongsTo(User)

module.exports = Marker
