const express = require('express')
const { User, Marker, AvailableZone } = require('models')
const { NotFoundError } = require('errors')
const {
  asyncMiddleware,
  validateMiddleware,
  checkAuthenticated
} = require('utils/middlewares')

const router = new express.Router()

router.get('/',
  checkAuthenticated('admin'),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async (req, res) => {
    const users = await User.findAll()
    const markers = await Marker.findAll()
    const availableZones = await AvailableZone.findAll()
    const queryset = {
      users,
      markers,
      zones: availableZones
    }
    res.json(queryset)
  }))

router.get('/users/:id',
  checkAuthenticated('admin'),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async ({ params: { id } }, res) => {
    const user = await User.findById(id, {
      include: [{
        model: Marker
      }]
    })
    if (!user) {
      throw new NotFoundError(`user ${id} not found`)
    }
    res.json(user)
  }))

router.put('/users/:id',
  checkAuthenticated('admin'),
  validateMiddleware('editUserAdmin'),
  asyncMiddleware(async ({ body: userData, params: { id } }, res) => {
    const user = await User.update(userData, {
      where: {
        id: id
      }
    })
    if (!user) {
      throw new NotFoundError(`user ${id} not found`)
    }
    res.json(userData)
  }))

router.post('/markers',
  checkAuthenticated('admin'),
  validateMiddleware('createMarkerAdmin'),
  asyncMiddleware(async ({ body: markerData }, res) => {
    const marker = await Marker.create(markerData)
    res.json(marker)
  }))

router.put('/markers/:id',
  checkAuthenticated('admin'),
  validateMiddleware('editMarkerAdmin'),
  asyncMiddleware(async ({ body: markerData, params: { id } }, res) => {
    const marker = await Marker.update(markerData, {
      where: {
        userId: id
      }
    })
    if (!marker) {
      throw new NotFoundError(`marker ${id} not found`)
    }
    res.json(markerData)
  }))

router.get('/markers/:id',
  checkAuthenticated('admin'),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async ({ params: { id } }, res) => {
    const marker = await Marker.findById(id)
    if (!marker) {
      throw new NotFoundError(`marker ${id} not found`)
    }
    res.json(marker)
  }))

router.get('/markers',
  checkAuthenticated('admin'),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async (req, res) => {
    const markers = await Marker.findAll()
    res.json(markers)
  }))

router.post('/zones',
  checkAuthenticated('admin'),
  validateMiddleware('createZone'),
  asyncMiddleware(async ({ body: zoneData }, res) => {
    const zone = await AvailableZone.create(zoneData)
    res.json(zone)
  }))

router.put('/zones/:id',
  checkAuthenticated('admin'),
  validateMiddleware('editZone'),
  asyncMiddleware(async ({ body: zoneData, params: { id } }, res) => {
    const zone = await AvailableZone.update(zoneData, {
      where: {
        id: id
      }
    })
    if (!zone) {
      throw new NotFoundError(`zone ${id} not found`)
    }
    res.json(zoneData)
  }))

router.get('/zones/:id',
  checkAuthenticated('admin'),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async ({ params: { id } }, res) => {
    const zone = await AvailableZone.findById(id)
    if (!zone) {
      throw new NotFoundError(`zone ${id} not found`)
    }
    res.json(zone)
  }))

module.exports = router
