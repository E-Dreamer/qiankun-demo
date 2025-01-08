let reg = /\/(.?*)\//;
const name = process.env.BASE_URL.match(reg)[1];
const isProd = process.env.NODE_ENV === "production";
module.exports ={
  publicPath: process.env.BASE_URL,
  lintOnSave: false,
  transpileDependencies: [],
  devServer: {
    port:8001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,
      // jsonpFunction: `webpackJsonp_${name}`, // webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal
    },
    /* plugins:[
      isProd?new FileManagerPlugin({
        runOnceInWatchMode: false,
        runTasksInSeries: false,
        events: {
          onEnd: {
            delete: [`./${name}.zip`],
            archive: [{ source: `./dist`, destination: `./${name}.zip` }],
          },
        },
      }) : {apply(){}}
    ] */
  },
}
