const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require("fs");

const path = require("path");


const pages = ['index'];

const htmlWebpackPerPage = (page) => {
  return new HTMLWebpackPlugin({
    inject: true, // soll JS in HTML ingetriert werden
    template: `./src/html/${page}.html`, // Ort des HTML-File
    filename: `${page}.html`, // wie es im DIST-Folder heissen soll
    chunks: [page], // JS Dateien können aufgeteilt werden ()
  });
};

const includePreprocessor = (content, loaderContext) => {
  return content.replace(
    /<include src="(.+)"\s*\/?>(?:<\/include>)?/gi,
    (m, src) => {
      const filePath = path.resolve(loaderContext.context, src)
      loaderContext.dependency(filePath)
      return fs.readFileSync(filePath, 'utf8')
    } 
  );
};

module.exports = {
  entry: pages.reduce((config, page) => {
    config[page] = `./src/js/${page}.js`;
    return config;
  }, {}),
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            preprocessor: includePreprocessor
          }
        },
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ].concat(pages.map(htmlWebpackPerPage))
};

