'use strict'

const emptyObject = require('./empty-object')
const emptySchemaWithId = require('./empty-schema-with-id')
const emptySchema = require('./empty-schema')
const urlWithId = require('./url-with-id')

const login = require('./login')
const loginAdmin = require('./login-admin')

const user = require('./user')
const editUser = require('./edit-user')
const editUserAdmin = require('./edit-user-admin')

const createMarker = require('./create-marker')
const createMarkerAdmin = require('./create-marker-admin')
const editMarker = require('./edit-marker')
const editMarkerAdmin = require('./edit-marker-admin')

const zone = require('./zone')
const createZone = require('./create-zone')
const editZone = require('./edit-zone')

module.exports = {
  emptyObject,
  emptySchema,
  emptySchemaWithId,
  urlWithId,

  login,
  loginAdmin,

  user,
  editUser,
  editUserAdmin,

  createMarker,
  createMarkerAdmin,
  editMarker,
  editMarkerAdmin,

  zone,
  createZone,
  editZone
}
