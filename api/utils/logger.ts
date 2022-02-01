import winston, { format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
// import path from 'path'
import config from '../config'

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const logFormat = format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)

const fileTransport: DailyRotateFile = new DailyRotateFile({
  filename: config.logConfig.file,
  dirname: config.logConfig.folder,
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
  maxFiles: '14d',
  format: format.combine(format.json())
})

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp(),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
  ),
  level: config.logConfig.level,
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        logFormat
      )
    }),
    fileTransport
  ]
})

export default logger
