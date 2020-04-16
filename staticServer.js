const Koa = require('koa')
const app = new Koa()
const path = require('path')
const static = require('koa-static')
const staticPath = './dist'

app.use(static(
  path.join( __dirname,  staticPath)
))

app.listen(9292)
