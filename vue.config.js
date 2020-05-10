const packageJson = require('./package.json')

module.exports = {
  devServer: {
    port: 8822
  },
  publicPath: process.env.NODE_ENV === 'production' ? 'https://blog-file.anymelon.com' : '',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].version = packageJson.version
        return args
      })
  }
}
