const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: process.env.VUE_APP_TITLE
    }
  },
  devServer:{
    proxy: {
      '/api': {
        target: 'https://meetingapi.daovitou.net',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
