import db from './db.js'
import logger from '../services/logger.js'

const queryPromise = (sql, args) => {
  return new Promise((res, rej) => {
    db.query(sql, args, (err, results) => {
      if (err) {
        logger.error('DB initialization failed: ', err)
        return rej(err)
      }

      return res(results)
    })
  })
}

export default queryPromise
