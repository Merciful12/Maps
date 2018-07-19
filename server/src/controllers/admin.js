const express = require('express')
const { User, Marker, Admin } = require('models')
const { NotFoundError } = require('errors')
const {
  asyncMiddleware,
  validateMiddleware,
  checkAuthenticated
} = require('utils/middlewares')

const router = new express.Router()

router.get('/',
  checkAuthenticated(Admin),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async (req, res) => {
    const users = await User.findAll()
    const markers = await Marker.findAll()
    const queryset = {
      users: users,
      markers: markers
    }
    res.json(queryset)
  }))

router.get('/users/:id',
  checkAuthenticated(Admin),
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
  checkAuthenticated(Admin),
  validateMiddleware('user'),
  asyncMiddleware(async ({ body: userData, params: { id } }, res) => {
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

router.post('/markers',
  checkAuthenticated(Admin),
  validateMiddleware('createMarker'),
  asyncMiddleware(async ({ body: markerData }, res) => {
    const marker = await Marker.create({
      ...markerData
    })
    res.json(marker)
  }))

router.put('/markers/:id',
  checkAuthenticated(Admin),
  validateMiddleware('createMarker'),
  asyncMiddleware(async ({ body: markerData, params: { id } }, res) => {
    const marker = await Marker.update(...markerData)
    if (!marker) {
      throw new NotFoundError(`marker ${id} not found`)
    }
    res.json(markerData)
  }))

router.get('/markers/:id',
  checkAuthenticated(Admin),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async ({ params: { id } }, res) => {
    const marker = await Marker.findById(id)
    if (!marker) {
      throw new NotFoundError(`marker ${marker.id} not found`)
    }
    res.json(marker)
  }))

router.get('/markers',
  checkAuthenticated(Admin),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async (req, res) => {
    const markers = await Marker.findAll()
    res.json(markers)
  }))

module.exports = router
