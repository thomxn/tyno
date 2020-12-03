'use strict'

import Sequelize from 'sequelize'
import config from '../config/config'
import logger from '../utils/logger'

// Import models
import User from './user'
import Address from './address'

const env = process.env.NODE_ENV || 'development'
const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'postgres',
    pool: config.pool,
    logQueryParameters: env === 'development',
    logging: (query, time) => {
      logger.info(time + 'ms' + ' ' + query)
    },
    benchmark: true,
    define: {
      underscored: true,
      freezeTableName: true
    }
  }
)

sequelize
  .authenticate()
  .then(() => {
    logger.info('DB connection establised!\n')
  })
  .catch(err => logger.error(JSON.stringify(err)))

const DB = {
  Users: User(sequelize),
  Address: Address(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize // library
}

DB.Users.hasMany(DB.Address, {
  foreignKey: 'userId',
  as: 'addresses'
})

export default DB
