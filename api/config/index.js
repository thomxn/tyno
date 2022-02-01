const { config } = require('dotenv')
const db = require('./db')
// Written in JS to ensure compatibility with seqielize-cli without requiring to build first

config()

module.exports = {
  db,
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 7000,
  logConfig: {
    folder: process.env.LOG_PATH || './logs/',
    file: process.env.LOG_FILE || 'server-log-%DATE%.log',
    level: process.env.LOG_LEVEL || 'silly' // Change this to info in production. IMPORTANT!
  }
}
