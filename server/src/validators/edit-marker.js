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
        zoneId: {
          type: 'integer',
          minimum: 1
        }
      },
      required: ['zoneId']
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
