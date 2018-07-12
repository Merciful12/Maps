'use strict'

const sequelize = require('utils/sequelize')
const { User, Marker } = require('models')
const Chance = require('chance')

const chance = new Chance()

const USER_NUM = 15

const initializerSeed = async () => {
  console.log('initializerSeed')

  const userNum = await User.count()

  if (userNum) {
    console.log('initializerSeed -> seed executed earlier')
    return
  }

  await sequelize.transaction(async (transaction) => {
    for (let i = 0; i < USER_NUM; i++) {
      const user = await User.create({
        name: chance.first(),
        email: chance.email(),
        password: chance.string({ length: 8 })
      }, { transaction })
      const marker = Marker.build({
        lat: chance.latitude({min: 51, max: 52}),
        lng: chance.longitude({min: 39, max: 40})
      })
      marker.setUser = (user, { save: false })
      await marker.save({ transaction })
    }
  })
  console.log('initializerSeed -> done')
}

module.exports = initializerSeed
