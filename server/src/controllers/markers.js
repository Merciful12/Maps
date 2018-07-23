const express = require('express')
const { Marker, AvailableZone } = require('models')
const { NotFoundError, ForbiddenError } = require('errors')
const {
  asyncMiddleware,
  validateMiddleware,
  checkAuthenticated
} = require('utils/middlewares')

class MarkerInAvailableZone {
  constructor (marker) {
    this.marker = marker
  }

  check (zone) {
    const R = 6378137 // Earth’s mean radius in meter
    const dLat = this.rad(zone.lat - this.marker.lat)
    const dLong = this.rad(zone.lng - this.marker.lng)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(this.marker.lat)) * Math.cos(this.rad(zone.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // the distance in meter
    return (zone.radius - d) >= 0
  }

  rad (x) { return x * Math.PI / 180 }
}

const router = new express.Router()

router.post('/create',
  checkAuthenticated(),
  validateMiddleware('createMarker'),
  asyncMiddleware(async ({ body: markerData, authenticatedUser }, res) => {
    const availableZones = await AvailableZone.findAll()
    const checker = new MarkerInAvailableZone(markerData)
    const checkMarker = availableZones.some(checker.check.bind(checker))
    if (!checkMarker) {
      throw new ForbiddenError('Cannot create marker here')
    }
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
    const availableZones = await AvailableZone.findAll()
    const checker = new MarkerInAvailableZone(markerData)
    const checkMarker = availableZones.some(checker.check.bind(checker))
    if (!checkMarker) {
      throw new ForbiddenError('Cannot create marker here')
    }
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
    const availableZones = await AvailableZone.findAll()
    const queryset = {
      marker,
      zones: availableZones
    }
    res.json(queryset)
  }))

module.exports = router
