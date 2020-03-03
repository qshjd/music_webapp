module.exports = {
  publicPath: './',
   //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。

   assetsDir: 'static',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}