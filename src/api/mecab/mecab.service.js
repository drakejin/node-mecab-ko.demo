const mecab = require('mecab-ffi')

module.exports.getMecab = async (ctx, next) => {
  const { data } = ctx
  const result = {
  }
  Object.keys(data).forEach((key) => {
    result[key] = mecab.parseSync(data[key])
  })

  ctx.result = result
  await next()
}

module.exports.getMecabNouns = async (ctx, next) => {
  const promises = Object.keys(ctx.data).map((key) => new Promise((resolve, reject) => {
    mecab.extractSortedNounCounts(ctx.data[key], (err, data) => {
      if (err) reject(err)
      resolve({ key, nouns: data })
    })
  }))
  const result = await Promise.all(promises)
  ctx.result = result
  await next()
}

// 다이스계수
module.exports.getMecabDiceCoefficient = async (ctx, next) => {
  const { source, target } = ctx.data

  const result = await new Promise((resolve, reject) => {
    mecab.getDiceCoefficientByString(source, target, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })

  const promises = Object.keys(ctx.data).map((key) => new Promise((resolve, reject) => {
    mecab.extractSortedNounCounts(ctx.data[key], (err, data) => {
      if (err) reject(err)
      resolve({ key, nouns: data })
    })
  }))
  const nouns = await Promise.all(promises)
  ctx.result = {
    result,
  }
  nouns.forEach(item => {
    ctx.result[item.key] = item.nouns
  })
  await next()
}
