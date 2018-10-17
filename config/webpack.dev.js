const webpack = require('webpack');
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const findPort = require('./FindPort')

const config = require('../config');
const configPort = config.devServer.port || 8080;
const host = config.devServer.host || 'localhost';
const api = config.proxy || [];
// 设置代理
let proxy = {};
for (let item of api) {
  proxy[item['path']] = {
    changeOrigin: item['changeOrigin'] || true,
    target: item['target']
  }
}

async function returnData () {
  let port = await findPort(configPort, configPort + 1000);
  let tipMsg = '';
  if (port !== configPort) {
    tipMsg = `${configPort}端口已被占用, 正在开启${port}端口。`;
    console.log(tipMsg)
  }

  return merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      host,
      port,
      proxy,
      contentBase: "./dist",
      hot: true,
      quiet: true,
      overlay: {
        errors: true, // 编译出现错误时，错误直接贴到页面上
      }
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: tipMsg ?
              [tipMsg, `你的程序运行在：${host}: ${port}`] :
              [`你的程序运行在：${host}: ${port}`],
          notes: ['~^o^~']
        },
        clearConsole: true
      })
    ]
  })
}

module.exports = returnData();
