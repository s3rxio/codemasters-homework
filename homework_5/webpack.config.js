const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const exclude = [/node_modules/, /build/];
const outDir = path.resolve(__dirname, "build");

module.exports = {
  entry: "./src",
  devServer: {
    static: {
      directory: outDir
    },
    compress: true,
    hot: true,
    port: 9000
  },
  output: {
    filename: "[name].[contenthash].js",
    path: outDir,
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Homework 5",
      filename: "index.html",
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader",
        exclude: exclude
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: exclude
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "~": path.resolve(__dirname, "node_modules")
    }
  }
};
