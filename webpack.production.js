"use strict";

const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackExternalPlugin = require("html-webpack-externals-plugin");
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    // 正则匹配
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        inject: true,
        chunks: ['common','vendors', pageName],
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  });
  return {
    entry,
    htmlWebpackPlugin,
  };
};
const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  entry: entry, // 单入口位字符串  多入口为对象  键值对写入
  output: {
    path: path.join(__dirname, "dist"), // 输出文件夹  dist目录
    filename: "[name]_[chunkhash:8].js", // 打包后的文件名
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /.js$/,
        use: "babel-loader",
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  browsers: ["last 2 versions", ">1%", "ios 7"],
                }),
              ],
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8][ext]",
            },
          },
        ],
      },
      {
        test: /.(woff|wof2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8][ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new OptimizeCss({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackExternalPlugin({
    //   externals: [
    //     {
    //       module: "react",
    //       entry: "https://unpkg.com/react@16/umd/react.production.min.js",
    //       global: "React",
    //     },
    //     {
    //       module: "react-dom",
    //       entry: "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
    //       global: "ReactDOM",
    //     },
    //   ],
    // }),
  ].concat(htmlWebpackPlugin),
  devtool: "inline-source-map",
  optimization: {
    splitChunks: {
      minSize:0,
      cacheGroups: {
        commons: {
          // test: /(react|react-dom)/,
          // name: "vendors",
          // chunks: "all",
          name: "commons",
          chunks: "all",
          minChunks:2
        },
      },
    },
  },
};
