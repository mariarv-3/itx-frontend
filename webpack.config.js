const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.tsx",

  output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
  },

  resolve: {
      extensions: [".tsx", ".ts", ".js"],
  },

  module: {
      rules: [
      {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
      },
      {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
      },
      ],
  },

  plugins: [
      new HtmlWebpackPlugin({
      template: "./public/index.html",
      }),
  ],

  devServer: {
      static: "./dist",
      port: 3000,
      open: true,
      historyApiFallback: true,
  },
};