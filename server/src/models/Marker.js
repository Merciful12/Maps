'use strict'

const sequelize = require('utils/sequelize')
const Sequelize = require('sequelize')

const schema = {
  lat: {
    type: Sequelize.DOUBLE
  },
  lng: {
    type: Sequelize.DOUBLE
  }
  // userId: {
  //   type: Sequelize.DOUBLE,
  //   primaryKey: true,
  //   allowNull: false
  // }
}

const options = {}

const Marker = sequelize.define('Marker', schema, options)

module.exports = Marker
