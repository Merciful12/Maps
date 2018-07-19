'use strict'

const emptyObject = require('./empty-object')
const emptySchemaWithId = require('./empty-schema-with-id')
const emptySchema = require('./empty-schema')
const urlWithId = require('./url-with-id')
const login = require('./login')
const user = require('./user')
const createMarker = require('./create-marker')
const createZone = require('./create-zone')

module.exports = {
  emptyObject,
  emptySchema,
  emptySchemaWithId,
  urlWithId,
  user,
  createZone,
  createMarker,
  login
}
