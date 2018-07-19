'use strict'

const schema = {
  type: 'object',
  properties: {
    body: {
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
    },
    params: {
      $ref: 'emptyObject'
    },
    query: {
      $ref: 'emptyObject'
    }
  },
  required: ['body']
}

module.exports = schema
