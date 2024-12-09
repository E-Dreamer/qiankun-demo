const path = require('path')
const webpack = require('webpack')
const os = require('os')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

function getNetworkIp() {
  let needHost = '' // 打开的host
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces()
    // console.log("network",network)
    for (let dev in network) {
      let iface = network[dev]
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i]
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.internal
        ) {
          needHost = alias.address
          // console.log("alias.address",alias.address)
        }
        // console.log("alias",alias)
      }
    }
  } catch (e) {
    needHost = 'localhost'
  }
  return needHost
}

const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: process.env.BASE_URL,
  productionSourceMap: false,
  lintOnSave: false,
  transpileDependencies: [],
  devServer: {
    port: 8000,
    host: getNetworkIp(),
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    /* proxy: {
      [API_BASE_URL]: {
        target: '',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          [API_BASE_URL]: '',
        },
      },
    }, */
  },
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve('src'))
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
      },
    },
  },
}
