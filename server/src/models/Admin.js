'use strict'

const sequelize = require('utils/sequelize')
const Sequelize = require('sequelize')
const config = require('config')
const bcrypt = require('bcrypt')
const { pepperAdd } = require('utils/security')

const schema = {
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  }
}

const saltRounds = config.get('security.saltRounds')
const hashPasswordHook = async (admin, options) => {
  if (!admin.changed('password')) {
    return
  }
  const passwordHash = await bcrypt.hash(pepperAdd(admin.password), saltRounds)
  admin.password = passwordHash
}

const options = {
  hooks: {
    beforeCreate: hashPasswordHook,
    beforeUpdate: hashPasswordHook
  }
}

const Admin = sequelize.define('Admin', schema, options)

module.exports = Admin
