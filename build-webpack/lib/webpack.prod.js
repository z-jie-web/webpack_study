const merge = require('webpack-merge');

const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalPlugin = require('html-webpack-externals-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCss({
      // 代码压缩
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalPlugin({
      // 提取公告资源包
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry:
            'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  optimization: {
    // 提取公共包
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          // test: /(react|react-dom)/,
          // name: "vendors",
          // chunks: "all",
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
