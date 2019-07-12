const Joi = require('joi')
const empty = require('is-empty')

module.exports.getMecab = async (ctx, next) => {
  const keys = Object.keys(ctx.data)
  const schema = {}

  keys.forEach((key) => {
    schema[key] = Joi.string()
  })

  const validation = Joi.validate(ctx.data, schema)

  if (validation.error) {
    ctx.error = validation.error
  }

  if (!empty(ctx.error)) {
    ctx.error.name = 'ValidationError'
    ctx.error.statusCode = 400
    return
  }

  await next()
}

module.exports.getMecabDiceCoefficient = async (ctx, next) => {
  const schema = {
    source: Joi.string().required(),
    target: Joi.string().required(),
  }

  const validation = Joi.validate(ctx.data, schema)

  if (validation.error) {
    ctx.error = validation.error
  }

  if (!empty(ctx.error)) {
    ctx.error.name = 'ValidationError'
    ctx.error.statusCode = 400
    return
  }

  await next()
}
