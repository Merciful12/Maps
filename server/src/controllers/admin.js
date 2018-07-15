const express = require('express')
const { User, Marker, Admin } = require('models')
const bcrypt = require('bcrypt')
const config = require('config')
const { pepperAdd } = require('utils/security')
const { cookieTracker } = require('services')
const { NotFoundError } = require('errors')
const { app: logger } = require('utils/logger')
const { NO_CONTENT } = require('http-status')
const {
  asyncMiddleware,
  validateMiddleware,
  checkAuthenticated
} = require('utils/middlewares')

const { name: cookieName, config: cookieConfig } = config.get('security.cookie')

const router = new express.Router()

router.post('/login',
  validateMiddleware('login'),
  asyncMiddleware(async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findOne({
      where: {
        email: email
      }
    })
    if (!admin) {
      throw new NotFoundError(`admin with matching email and password not found`)
    }

    const passwordCorrect = await bcrypt.compare(pepperAdd(password), admin.password)
    if (!passwordCorrect) {
      throw new NotFoundError(`admin with matching email and password not found`)
    }
    const newCookie = await cookieTracker.cookieCreate(admin)
    logger.debug('login -> setting cookie %s = %s with params %j', cookieName, newCookie, cookieConfig)
    res.cookie(cookieName, newCookie, cookieConfig)
    res.json(admin)
  })
)

router.post('/logout',
  checkAuthenticated(),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async (req, res) => {
    cookieTracker.cookieRemove(req.cookies[cookieName])
    res.clearCookie(cookieName)
    res.status(NO_CONTENT).send()
  })
)

router.get('/',
  checkAuthenticated(Admin, false),
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
  checkAuthenticated(Admin, false),
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
  checkAuthenticated(Admin, true),
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
  checkAuthenticated(Admin, false),
  validateMiddleware('createMarker'),
  asyncMiddleware(async ({ body: markerData }, res) => {
    const marker = await Marker.create({
      ...markerData
    })
    res.json(marker)
  }))

router.put('/markers/:id',
  checkAuthenticated(Admin, false),
  validateMiddleware('createMarker'),
  asyncMiddleware(async ({ body: markerData, params: { id } }, res) => {
    const marker = await Marker.update(...markerData)
    if (!marker) {
      throw new NotFoundError(`marker ${id} not found`)
    }
    res.json(markerData)
  }))

router.get('/markers/:id',
  checkAuthenticated(Admin, false),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async ({ params: { id } }, res) => {
    const marker = await Marker.findById(id)
    if (!marker) {
      throw new NotFoundError(`marker ${marker.id} not found`)
    }
    res.json(marker)
  }))

router.get('/markers',
  checkAuthenticated(Admin, false),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async (req, res) => {
    const markers = await Marker.findAll()
    res.json(markers)
  }))

module.exports = router
