const express = require('express')
const { Marker } = require('models')
const { NotFoundError } = require('errors')
const {
  asyncMiddleware,
  validateMiddleware,
  checkAuthenticated
} = require('utils/middlewares')

const router = new express.Router()

router.post('/create',
  checkAuthenticated(),
  validateMiddleware('createMarker'),
  asyncMiddleware(async ({ body: markerData, authenticatedUser }, res) => {
    const marker = await Marker.create({
      userId: authenticatedUser.id,
      ...markerData
    })
    res.json(marker)
  }))

router.put('/edit',
  checkAuthenticated(),
  validateMiddleware('editMarker'),
  asyncMiddleware(async ({ body: markerData, authenticatedUser }, res) => {
    const marker = await Marker.update(markerData, {
      where: {
        userId: authenticatedUser.id
      }
    })
    if (!marker) {
      throw new NotFoundError(`user ${authenticatedUser.id} doesnt have a marker`)
    }
    res.json(markerData)
  }))

router.get('/',
  checkAuthenticated(),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async ({ authenticatedUser }, res) => {
    const marker = await Marker.findOne({
      where: {
        userId: authenticatedUser.id
      }
    })
    if (!marker) {
      throw new NotFoundError(`user ${authenticatedUser.id} doesnt have a marker`)
    }
    res.json(marker)
  }))

module.exports = router
