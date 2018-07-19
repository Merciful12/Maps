'use strict'

const sequelize = require('utils/sequelize')
const User = require('./User')

const schema = {}
const options = {}

const Admin = sequelize.define('Admin', schema, options)

Admin.belongsTo(User)

module.exports = Admin
