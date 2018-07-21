'use strict'

const schema = {
  type: 'object',
  properties: {
    body: {
      $ref: 'user'
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
