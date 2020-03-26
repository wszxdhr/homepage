module.exports = {
  devServer: {
    port: 8822
  },
  publicPath: process.env.NODE_ENV === 'production' ? 'https://wszxdhr.github.io/homepage' : ''
}
