const proxy = require('http-proxy-middleware')

const context = '/api'

const options = {
  target: 'http://localhost:3000',
  // rewrite paths
  pathRewrite: {
    '^/api': ''
  }
}

const apiProxy = proxy(context, options)

module.exports = (app) => { app.use(apiProxy) }
