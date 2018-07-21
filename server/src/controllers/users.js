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
  checkAuthenticated(User),
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

router.put('/edit',
  checkAuthenticated(User),
  validateMiddleware('editUser'),
  asyncMiddleware(async ({ body: userData, authenticatedUser }, res) => {
    const user = await User.update(userData, {
      where: {
        id: authenticatedUser.id
      }
    })
    if (!user.length) {
      throw new NotFoundError(`user not found`)
    }
    res.json(userData)
  }))

module.exports = router
