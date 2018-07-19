'use strict'

const schema = {
  type: 'object',
  properties: {
    body: {
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
      },
      params: {
        $ref: 'emptyObject'
      },
      query: {
        $ref: 'emptyObject'
      }
    }
  },
  required: ['body']
}

module.exports = schema
