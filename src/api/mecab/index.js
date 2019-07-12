const Router = require('koa-router')

const factory = require('./mecab.factory')
const validator = require('./mecab.validator')
const service = require('./mecab.service')

const mecabRouter = new Router()

mecabRouter.get('/', factory.getMecab, validator.getMecab, service.getMecab)
mecabRouter.get('/nouns', factory.getMecab, validator.getMecab, service.getMecabNouns)
mecabRouter.get('/dice', factory.getMecab, validator.getMecabDiceCoefficient, service.getMecabDiceCoefficient)


module.exports = mecabRouter
