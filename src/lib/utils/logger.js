const moment = require('moment')
const Winston = require('winston')

const {
  transports,
  format,
  createLogger,
} = Winston

const {
  NODE_ENV,
} = process.env


const consoleTransport = new transports.Console({
  name: 'consoleTransport',
  level: NODE_ENV === 'production' ? 'info' : 'silly',
  format: format.combine(
    format.timestamp(),
    format.splat(),
    format.ms(),
    format.json(),
  ),
})

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: () => (moment().format()),
    }),
    format.json(),
  ),
  transports: [consoleTransport],
  silent: NODE_ENV === 'test',
})

module.exports = logger
