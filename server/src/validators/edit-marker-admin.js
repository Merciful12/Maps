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
      }
    },
    params: {
      $ref: 'urlWithId'
    },
    query: {
      $ref: 'emptyObject'
    }
  },
  required: ['body', 'params']
}

module.exports = schema
