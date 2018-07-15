'use strict'

const express = require('express')
const { User, Marker } = require('models')
const { NotFoundError } = require('errors')
const {
  asyncMiddleware,
  validateMiddleware,
  checkAuthenticated
} = require('utils/middlewares')

const router = new express.Router()

router.get('/me',
  checkAuthenticated(false, false),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async ({ authenticatedUser }, res) => {
    const user = await User.findById(authenticatedUser.id, {
      include: [{
        model: Marker
      }]
    })
    if (!user) {
      throw new NotFoundError(`user ${authenticatedUser.id} not found`)
    }
    res.json(user)
  }))

router.put('/:id',
  checkAuthenticated(false, true),
  validateMiddleware('user'),
  asyncMiddleware(async ({ body: userData, params: { id } }, res) => {
    console.log(userData)

    const user = await User.update(userData, {
      where: {
        id: id
      }
    })
    if (!user) {
      throw new NotFoundError(`user ${id} not found`)
    }
    res.json(user)
  }))

module.exports = router
