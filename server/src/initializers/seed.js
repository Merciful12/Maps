'use strict'

const sequelize = require('utils/sequelize')
const { User, AvailableZone } = require('models')
const Chance = require('chance')
const config = require('config')
const { app: logger } = require('utils/logger')

const chance = new Chance()

const initializerSeed = async () => {
  const { numUsers, numMarkers } = config.get('db.seed')
  logger.info('initializerSeed %j', { numUsers })

  const userNum = await User.count()
  logger.info('users exist %j', userNum)

  if (userNum) {
    logger.info('initializerSeed -> seed executed earlier')
    return
  }

  await sequelize.transaction(async (transaction) => {
    const adminData = await User.create(config.get('db.admin'), { transaction })
    logger.debug(`initializerSeed -> admin created %j`, adminData)

    await User.create(config.get('db.sampleUser'), { transaction })

    const zone = await AvailableZone.create(config.get('db.sampleZone'), { transaction })

    const users = []
    for (let i = 0; i < numUsers; i++) {
      const userData = {
        name: chance.first(),
        age: chance.age(),
        email: chance.email(),
        password: chance.string({ length: 8 })
      }
      const user = await User.create(userData, { transaction })
      users.push(user)
      logger.debug(`initializerSeed -> user created %j`, userData)
    }
    for (let i = 0; i < numMarkers; i++) {
      const markerData = {
        lat: chance.latitude({min: 51.659174, max: 51.66}),
        lng: chance.longitude({min: 39.19477, max: 39.1949}),
        zoneId: zone.id
      }
      users[i].createMarker(markerData, { save: false })
      await users[i].save({ transaction })
      logger.debug(`initializerSeed -> user ${i + 1} created marker %j`, markerData)
    }
  })
  logger.info('initializerSeed -> done')
}

module.exports = initializerSeed
