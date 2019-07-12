const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')

const apiRouter = require('./api')

const app = new Koa()
const router = new Router()

router.use('/api', apiRouter.routes())

app.use(bodyParser())


app.use(router.routes())
app.use(router.allowedMethods())


app.listen(process.env.NODE_PORT, () => {
  console.log(process.env.NODE_PATH)
  console.log(process.env.NODE_PORT)
  console.log(process.env.NODE_ENV)
  console.log('일단 시작했습니다 :)')
})
