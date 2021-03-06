'use strict'

const router = require('express').Router()
const { asyncMiddleware, validateMiddleware, checkAuthenticated } = require('utils/middlewares')
const { User } = require('models')
const bcrypt = require('bcrypt')
const { NotFoundError, ConflictError } = require('errors')
const { pepperAdd } = require('utils/security')
const { cookieTracker } = require('services')
const config = require('config')
const { NO_CONTENT } = require('http-status')
const { app: logger } = require('utils/logger')

const { name: cookieName, config: cookieConfig } = config.get('security.cookie')

router.post('/login',
  validateMiddleware('login'),
  asyncMiddleware(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (!user) {
      throw new NotFoundError(`User with matching email and password not found`)
    }

    const passwordCorrect = await bcrypt.compare(pepperAdd(password), user.password)
    if (!passwordCorrect) {
      throw new NotFoundError(`User with matching email and password not found`)
    }

    let newCookie = await cookieTracker.cookieCreate(user)

    logger.debug('login -> setting cookie %s = %s with params %j', cookieName, newCookie, cookieConfig)
    res.cookie(cookieName, newCookie, cookieConfig)
    res.json(user)
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

router.post('/register',
  validateMiddleware('login'),
  asyncMiddleware(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      throw new ConflictError('Email already in use')
    }
    const newUser = await User.create({
      email,
      password
    })
    res.json(newUser)
  })
)
router.post('/admin/register',
  checkAuthenticated('admin'),
  validateMiddleware('loginAdmin'),
  asyncMiddleware(async (req, res) => {
    const { email, password, role } = req.body
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      throw new ConflictError('Email already in use')
    }
    const newUser = await User.create({
      email,
      password,
      role
    })
    res.json(newUser)
  })
)

module.exports = router
