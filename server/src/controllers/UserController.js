'use strict'

const express = require('express')
const { User } = require('models')
const { NotFoundError } = require('errors')
const {
  asyncMiddleware,
  validateMiddleware,
  checkAuthenticated
} = require('utils/middlewares')

const router = new express.Router()

router.get('/',
  validateMiddleware('emptySchema'),
  asyncMiddleware(async (req, res) => {
    const users = await User.findAll()
    res.json(users)
  }))

router.get('/:id',
  checkAuthenticated(),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async ({ params: { id } }, res) => {
    const user = await User.findById(id)
    if (!user) {
      throw new NotFoundError(`user ${id} not found`)
    }
    res.json(user)
  }))

module.exports = router
