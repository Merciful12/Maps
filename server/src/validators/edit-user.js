'use strict'

const schema = {
  type: 'object',
  properties: {
    body: {
      $ref: 'user'
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
