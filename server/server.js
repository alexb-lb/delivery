// import https from 'https'
// import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import bodyParserMW from 'koa-bodyparser'
import serve from 'koa-static'
import cors from 'koa2-cors'
import send from 'koa-send'

import config from './config/config.js'
import logger from './services/logger.js'
import errorMW from './middleware/error.js'
import apiRouter from './routes/rootRouter.js'
import checkDbConnected from './db/checkDbConnected.js'

import passport from 'koa-passport'

const start = async () => {
  const app = new Koa()

  app.on('error', (error) => logger.error('Koa app error: ', error))

  app
    .use(errorMW())
    .use(cors())
    .use(serve(path.resolve('../public')))
    .use(serve(path.resolve('../public', 'dist')))
    .use(bodyParserMW())
    .use(passport.initialize())
    .use(apiRouter.allowedMethods())
    .use(apiRouter.routes())
    .use(async (ctx) => {
      await send(ctx, 'index.html', { root: path.resolve('../public', 'dist') })
    })

  const server = app.listen(config.port)
  const addrInfo = server.address()

  try {
    await checkDbConnected()
  } catch (error) {
    logger.error('DB initialization failed: ', error)
    throw error
  }

  logger.info(`Listening on http://${addrInfo.address}:${addrInfo.port}`)
}

start()
  .then(() => {
    logger.info('Server start done')
  }).catch(error => {
    logger.error('Server start failed: ', error)

    process.exit(-1)
  })

process.on('uncaughtException', (error) => logger.error('Server process uncaught exception: ', error))
