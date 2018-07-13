'use strict'

const { raw } = require('config/raw')
const winston = require('winston')

const configDefault = {
  express: {
    port: process.env.PORT || 8081,
    limit: '10mb'
  },
  api: {
    base: '/api',
    v1: 'v1'
  },
  security: {
    pepper: 'nmWwY73T546vaaT6vBRw',
    saltRounds: 10,
    roles: {
      user: 'user',
      admin: 'admin'
    },
    cookie: {
      name: 'auth',
      config: {
        httpOnly: true,
        maxAge: 1800000
      }
    }
  },
  db: {
    seed: {
      numUsers: 15,
      numMarkers: 15
    },
    admin: {
      email: 'admin@admin.com',
      password: 'testpassword'
    },
    config: {
      database: process.env.DB_NAME || 'maps',
      user: process.env.DB_USER || 'maps',
      password: process.env.DB_PASS || 'maps',
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: 'maps.sqlite'
    }
  },
  loggers: {
    app: raw({
      level: 'debug',
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.label({ label: 'app' }),
        winston.format.printf(({ message, timestamp, label, level }) => `${timestamp} [${label}] ${level}: ${message}`)
      ),
      transports: [
        new winston.transports.Console()
      ]
    }),
    db: raw({
      level: 'debug',
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.label({ label: 'db' }),
        winston.format.printf(({ message, timestamp, label, level }) => `${timestamp} [${label}] ${level}: ${message}`)
      ),
      transports: [
        new winston.transports.Console()
      ]
    })
  }
}

module.exports = configDefault
