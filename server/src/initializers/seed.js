'use strict'

const sequelize = require('utils/sequelize')
const { User, Marker } = require('models')
const Chance = require('chance')
const config = require('config')
const { app: logger } = require('utils/logger')

const chance = new Chance()

const initializerSeed = async () => {
  const { numUsers } = config.get('db.seed')
  logger.info('initializerSeed %j', { numUsers })

  const userNum = await User.count()

  if (userNum) {
    logger.info('initializerSeed -> seed executed earlier')
    return
  }

  await sequelize.transaction(async (transaction) => {
    for (let i = 0; i < numUsers; i++) {
      const marker = await Marker.create({
        lat: chance.latitude({min: 51, max: 52}),
        lng: chance.longitude({min: 39, max: 40})
      }, { transaction })
      const user = User.build({
        name: chance.first(),
        email: chance.email(),
        password: chance.string({ length: 8 })
      })
      user.setMarker(marker, { save: false })

      await user.save({ transaction })
    }
  })
  logger.info('initializerSeed -> done')
}

module.exports = initializerSeed
