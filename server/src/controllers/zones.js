'use strict'

const express = require('express')
const { User, AvailableZone } = require('models')
const {
  asyncMiddleware,
  validateMiddleware,
  checkAuthenticated
} = require('utils/middlewares')

const router = new express.Router()

router.get('/',
  checkAuthenticated(User),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async (req, res) => {
    const availableZones = await AvailableZone.findAll()

    res.json(availableZones)
  }))

module.exports = router
