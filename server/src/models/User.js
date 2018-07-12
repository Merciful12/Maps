'use strict'

const sequelize = require('utils/sequelize')
const Sequelize = require('sequelize')

const Marker = require('./Marker')

const schema = {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  }
}

const options = {
  indexes: [
    {
      fields: [ 'name' ]
    },
    {
      fields: [ 'email' ]
    }
  ]
}

const User = sequelize.define('User', schema, options)

User.belongsTo(Marker)

module.exports = User
