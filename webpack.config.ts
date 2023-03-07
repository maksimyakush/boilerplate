import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { resolve } from "path";
import { Configuration } from "webpack";
import CopyPlugin from "copy-webpack-plugin";

const config: Configuration = {
  target: "browserslist",
  mode: "development",
  entry: { main: "./src/index.tsx" },
  devtool: "source-map",
  output: {
    filename: "static/js/[name].[contenthash:5].bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
    chunkFilename: "static/js/[id].[contenthash:5].js",
    assetModuleFilename: "static/assets/[hash][ext][query]",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.mdx?$/,
        loader: "@mdx-js/loader",
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:5].css",
      chunkFilename: "static/css/[name].[contenthash:5].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./public",
          filter: async (resourcePath) => {
            // Do not copy html files. They are managed by HtmlWebpackPlugin
            const ignoredExtention = "html";
            const extention = resourcePath.split(".").at(-1);

            return extention !== ignoredExtention;
          },
        },
      ],
    }),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
};

export default config;
