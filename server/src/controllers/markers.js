const express = require('express')
const { Marker, User } = require('models')
const { NotFoundError } = require('errors')
const {
  asyncMiddleware,
  validateMiddleware,
  checkAuthenticated
} = require('utils/middlewares')

const router = new express.Router()

router.post('/',
  checkAuthenticated(false, false),
  // validateMiddleware('markCreate'),
  asyncMiddleware(async ({ body: markerData, authenticatedUser }, res) => {
    const marker = await Marker.create({
      id: authenticatedUser.id,
      ...markerData
    })
    res.json(marker)
  }))

router.put('/:id',
  checkAuthenticated(false, false),
  asyncMiddleware(async ({ body: markerData, authenticatedUser, params: { id } }, res) => {
    const marker = await Marker.update(markerData, {
      where: {
        id: id
      }
    })
    if (!marker) {
      throw new NotFoundError(`user ${authenticatedUser.id} doesnt have a marker`)
    }
    res.json(markerData)
  }))

router.get('/:id',
  checkAuthenticated(false, false),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async ({ params: { id } }, res) => {
    const marker = await Marker.findById(id, {
      include: [
        { model: User }
      ]
    })
    if (!marker) {
      throw new NotFoundError(`marker ${marker.id} not found`)
    }
    res.json(marker)
  }))

module.exports = router
