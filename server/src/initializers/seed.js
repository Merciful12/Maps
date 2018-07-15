'use strict'

const sequelize = require('utils/sequelize')
const { User, Admin, Marker } = require('models')
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
    await Admin.create(config.get('db.admin'), { transaction })

    const users = []
    for (let i = 0; i < numUsers; i++) {
      const pass = chance.string({ length: 8 })
      logger.debug('PASSWORD %j', pass)
      const user = await User.create({
        name: chance.first(),
        age: chance.age(),
        email: chance.email(),
        password: pass
      }, { transaction })
      users.push(user)
    }

    for (let i = 0; i < numMarkers; i++) {
      const marker = await Marker.build({
        lat: chance.latitude({min: 51, max: 52}),
        lng: chance.longitude({min: 39, max: 40})
      })

      users[i].setMarker(marker)
      await marker.save({ transaction })
      logger.debug('initializerSeed -> marker creted %j', marker)
    }
  })
  logger.info('initializerSeed -> done')
}

module.exports = initializerSeed
