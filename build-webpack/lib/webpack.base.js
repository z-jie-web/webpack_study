const CleanWebpackPlugin  = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyPlugin = require('friendly-errors-webpack-plugin');
// const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Autoprefixer = require('autoprefixer');
const path = require('path');
const glob = require('glob');


const projectRoot = process.cwd()

const setMPA = () => {
  // 多页面打包
  const entry = {};
  const htmlWebpackPlugin = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    // 正则匹配
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    return htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        inject: true,
        chunks: ['common', 'vendors', pageName],
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
        // process,
      }),
    );
  });
  return {
    entry,
    htmlWebpackPlugin,
  };
};
const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          'babel-loader',
          // "eslint-loader"
        ],
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                Autoprefixer({
                  browsers: ['last 2 versions', '>1%', 'ios 7'],
                }),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
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
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]',
            },
          },
        ],
      },
      {
        test: /.(woff|wof2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // new webpack.ProvidePlugin({
    //   // 添加process对象
    //   process: "process/browser",
    // }),
    new MiniCssExtractPlugin({
      // 单独提取css文件
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(), // 打包前清理目录
    new FriendlyPlugin(), // 命令行显示优化
    function errorPlugin() {
      // 错误捕获
      this.hooks.done.tap('done', (status) => {
        if (
          status.compilation.errors
          && status.compilation.errors.length
          && process.argv.indexOf('--watch' === -1)
        ) {
          console.log('build error');//eslint-disable-line
          // process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugin),
  stats: 'errors-only',
};
