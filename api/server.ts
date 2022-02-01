import app from './app'
import logger from './utils/logger'
import config from './config'

const PORT = config.port

console.log(PORT)

if (PORT === null || PORT === undefined || isNaN(PORT)) {
  logger.error('Please specify a proper port for the App')
  process.exit(1)
}

try {
  app.listen(PORT, () => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    logger.info(`Server is running on port ${PORT} 🔥`)
  })
} catch (err) {
  logger.error(err)
}
