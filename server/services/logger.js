import Winston from 'winston'
import TripleBeam from 'triple-beam'
import { inspect } from 'util'

import config from '../config/config.js'

const { LEVEL, MESSAGE, SPLAT } = TripleBeam
const { format, createLogger, transports } = Winston

const devFormat = format(info => {
  if (info instanceof Error || info.stack) {
    info[MESSAGE] = `${info.timestamp} - ${info.level}: ${info.stack}`
  } else {
    const strippedMeta = Object.assign({}, info)

    delete strippedMeta[LEVEL]
    delete strippedMeta.level
    delete strippedMeta[MESSAGE]
    delete strippedMeta.message
    delete strippedMeta[SPLAT]
    delete strippedMeta.timestamp
    delete strippedMeta.facility

    const inspectedObject = inspect(strippedMeta, { colors: true, breakLength: 100, depth: 5 })

    info[MESSAGE] = `${info.timestamp} - ${info.level}: ${info.message}` +
      ` ${inspectedObject === '{}' ? '' : inspectedObject}`.trimRight()
  }

  return info
})

const metadataEnricher = format(info => {
  info.env = process.env.NODE_ENV || 'n/a'

  return info
})

const customLogFormat = () => {
  return process.env.NODE_ENV === 'development'
    ? format.combine(format.colorize(), format.timestamp({ format: 'HH:mm:ss.SSS' }), devFormat())
    : format.combine(format.errors({ stack: true }), format.timestamp(), metadataEnricher(), format.json())
}

const logger = createLogger({
  level: config.logLevel,
  format: customLogFormat(),
  transports: [
    new transports.Console(),
  ],
})

export default logger
