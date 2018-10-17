const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 配置入口文件和html-webpack-plugin
const config = require('../config');
const pageConfig = config.pageConfig;
let entry = {};
let htmlList = [];
for (let item of pageConfig) {
  // entry
  entry[item['entryName']] = item['entryPath'];
  // html-webpack-plugin
  htmlList.push(new HtmlWebpackPlugin(
      {
        filename: item['filename'],
        template: item['template'],
        inject: item['inject'] ? item['inject'] : true,
        chunks: item['chunks']
      }
  ));
}

module.exports = {
  entry,
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          priority: 10,
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  output: {
    filename: "static/js/[name].[hash].bundle.js",
    chunkFilename: "static/js/[name].[hash].bundle.js",
    path: path.resolve(__dirname, "../", "dist")
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../")
    }),
    ...htmlList
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', "style-loader", "css-loader"]
      },
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: '[hash:7].[ext]',
              outputPath: 'static/img/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[hash:7].[ext]',
              outputPath: 'static/font/'
            }
          }
        ]
      },
      {
        test: /\.art$/,
        loader: "art-template-loader"
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }
};
