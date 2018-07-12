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
  console.log('initializerSeed -> done')
}

module.exports = initializerSeed
