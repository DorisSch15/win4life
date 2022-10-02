const path = require("path"); // import * from path
const { merge } = require("webpack-merge");
const common = require("./webpack.common"); // import common from './webpack.common.js'


// je weiter hinten es im merge() ist, desto mehr gewicht hat es. was hier geschrieben ist und im common auch vorkommt, wird durch die Eingabe in diesem file überschrieben.

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: 'assets/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  }
});