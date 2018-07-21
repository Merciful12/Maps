'use strict'

const schema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        userId: {
          type: 'integer',
          minimum: 1
        },
        lat: {
          type: 'number'
        },
        lng: {
          type: 'number'
        }
      },
      required: ['lat', 'lng', 'userId']
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
