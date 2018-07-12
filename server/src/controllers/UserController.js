'use strict'

const express = require('express')
const { User, Marker } = require('models')

const router = new express.Router()

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      { model: Marker }
    ]
  })
  res.json(users)
})

module.exports = router
