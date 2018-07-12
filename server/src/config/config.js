module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'maps',
    user: process.env.DB_USER || 'maps',
    password: process.env.DB_PASS || 'maps',
    options: {
      dialect: process.env.DIALECt || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: 'maps.sqlite'
    }
  }
}
