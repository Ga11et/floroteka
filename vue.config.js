module.exports = {
  chainWebpack: (config) => {
    config.transpileDependencies = true
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/floroteka/' : '/'
}
