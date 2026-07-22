const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.tsx",

  output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "/",
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
          test: /\.module\.css$/,
          use: [
              "style-loader",
              {
                  loader: "css-loader",
                  options: {
                      modules: {
                          namedExport: false,
                      },
                  },
              },
          ],
      },
      {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ["style-loader", "css-loader"],
      },
      {
          test: /\.svg$/,
          type: "asset/resource",
          generator: {
              filename: "[name][ext]",
          },
      },
      ],
  },

  plugins: [
      new HtmlWebpackPlugin({
          template: "./public/index.html"
      }),
  ],

  devServer: {
      static: ["./dist", "./public"],
      port: 3000,
      open: true,
      historyApiFallback: true,
  },
};