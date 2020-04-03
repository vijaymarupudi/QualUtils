const HtmlWebpackPlugin = require("html-webpack-plugin");

const packagejson = require("./package.json")

const libraryConfig = {
  mode: "development",
  entry: "./index.js",
  devtool: "source-map",
  output: {
    filename: `QualUtils-${packagejson.version}.js`,
    library: "QualUtils",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

const testConfig = {
  mode: "development",
  entry: "./test-index.js",
  devtool: "source-map",
  output: {
    filename: "test-app-main.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
};

module.exports = [libraryConfig, testConfig];
