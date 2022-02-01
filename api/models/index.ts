'use strict'

import Sequelize from 'sequelize'
import config from '../config'
import logger from '../utils/logger'

// Import models
import User from './user'
import Address from './address'

const env = config.nodeEnv

const sequelize = new Sequelize.Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'postgres',
    pool: config.db.pool,
    port: config.db.port,
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
  .catch(err => console.log(err))

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
