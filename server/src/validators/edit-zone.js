'use strict'

const schema = {
  type: 'object',
  properties: {
    body: {
      $ref: 'zone'
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
