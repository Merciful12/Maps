'use strict'

const sequelize = require('utils/sequelize')
const Sequelize = require('sequelize')
const config = require('config')
const bcrypt = require('bcrypt')
const { pepperAdd } = require('utils/security')

const Marker = require('./Marker')

const schema = {
  name: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  }
}

const saltRounds = config.get('security.saltRounds')
const hashPasswordHook = async (user, options) => {
  if (!user.changed('password')) {
    return
  }
  const passwordHash = await bcrypt.hash(pepperAdd(user.password), saltRounds)
  user.password = passwordHash
}

const options = {
  indexes: [
    {
      fields: [ 'name' ]
    },
    {
      fields: [ 'email' ]
    }
  ],
  hooks: {
    beforeCreate: hashPasswordHook,
    beforeUpdate: hashPasswordHook
  }
}

const User = sequelize.define('User', schema, options)

User.hasOne(Marker, { foreignKey: 'userId' })

module.exports = User
