'use strict'

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    lat: {
      type: 'number'
    },
    lng: {
      type: 'number'
    },
    radius: {
      type: 'number',
      minimum: 1
    }
  },
  required: ['lat', 'lng', 'radius']
}

module.exports = schema
