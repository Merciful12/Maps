'use strict'

const schema = {
  type: 'object',
  properties: {
    body: {
      $ref: 'zone'
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
