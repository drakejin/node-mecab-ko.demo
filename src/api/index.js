const Router = require('koa-router')

const apiRouter = new Router()

const mecabRouter = require('./mecab')


apiRouter.use('/mecab', mecabRouter.routes())

apiRouter.get('/', async (ctx) => {
  ctx.body = {
    pong: 'apiRouter',
  }
})

module.exports = apiRouter
