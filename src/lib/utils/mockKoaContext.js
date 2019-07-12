const Stream = require('stream')
const Koa = require('koa')

// https://github.com/koajs/koa/issues/999#issuecomment-309270599
// raw source  => https://github.com/koajs/koa/blob/master/test/helpers/context.js

module.exports = (req, res, app) => {
  let request = req
  let response = res
  let application = app
  const socket = new Stream.Duplex()
  request = Object.assign({ headers: {}, socket }, Stream.Readable.prototype, request)
  response = Object.assign({ _headers: {}, socket }, Stream.Writable.prototype, response)
  request.socket.remoteAddress = req.socket.remoteAddress || '127.0.0.1'
  application = application || new Koa()
  response.getHeader = k => response._headers[k.toLowerCase()]
  response.setHeader = (k, v) => response._headers[k.toLowerCase()] = v
  response.removeHeader = (k) => delete res._headers[k.toLowerCase()]
  return application.createContext(request, response)
}

module.exports.request = (req, res, app) => module.exports(req, res, app).request

module.exports.response = (req, res, app) => module.exports(req, res, app).response
