const { User, Marker } = require('../models/')

module.exports = {
  async list (req, res) {
    try {
      const users = await User.findAll({
        include: [
          { model: Marker }
        ]
      })
      res.send(users)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the songs.'
      })
    }
  }
}
