const logger = require('lib/utils/logger')
const empty = require('is-empty')

module.exports.getMecab = async (ctx, next) => {
  logger.debug(ctx.request.body)

  ctx.data = ctx.request.body
  ctx.result = {}
  ctx.error = {}


  await next()


  if (empty(ctx.error)) { // success
    ctx.body = ctx.result
  } else { // failure
    ctx.response.status = ctx.error.statusCode
    ctx.body = ctx.error
  }

  logger.debug(ctx.response.body)
}
