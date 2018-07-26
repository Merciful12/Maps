'use strict'

const { CONFLICT } = require('http-status')

const AbstractError = require('./abstract-error')

class ConflictError extends AbstractError {
  constructor (message) {
    super(message)

    this.status = CONFLICT
  }
}

module.exports = ConflictError
