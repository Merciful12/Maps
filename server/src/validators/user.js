'use strict'

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    name: {
      type: 'string',
      pattern: '^[A-Za-z]{1,32}$'
    },
    age: {
      type: 'integer',
      minimum: 1
    }
  }
}

module.exports = schema
