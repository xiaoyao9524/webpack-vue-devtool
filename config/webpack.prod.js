const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new DashboardPlugin()
    ]
});
