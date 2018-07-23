'use strict'

const express = require('express')
const { AvailableZone } = require('models')
const {
  asyncMiddleware,
  validateMiddleware,
  checkAuthenticated
} = require('utils/middlewares')

const router = new express.Router()

router.get('/',
  checkAuthenticated(),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async (req, res) => {
    const availableZones = await AvailableZone.findAll()

    res.json(availableZones)
  }))

module.exports = router
