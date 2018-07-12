const UserController = require('./controllers/UserController')

module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.send({
      message: `hello ${req.body.email}, have fun`
    })
  })

  app.get('/users', UserController.list)
  // app.get('/users/:userId', UserController.detail)
}
