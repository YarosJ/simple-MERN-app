const webpack = require('webpack');
const path = require('path');
const debug = require('debug');
// const debug = false;
const BUILD_DIR = path.resolve(__dirname, 'view/public');
const APP_DIR = path.resolve(__dirname, 'view/app');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  context: path.join(__dirname, 'view'),
  devtool: debug ? 'inline-sourcemap' : false,
  entry: `${APP_DIR}/index.jsx`,
  watch: true,
  output: {
    path: BUILD_DIR,
    filename: 'client.min.js',
  },

  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif)$/i, // to support eg. background-image property
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]',
          outputPath: '../',
        },
      }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // to support @font-face rule
        loader: 'url-loader',
        query: {
          limit: '10000',
          name: '[path][name].[ext]',
          outputPath: '../',
        },
      }, {
        test: /\.jsx?$/,
        include: APP_DIR,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        },
      }, {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: true,
            }
          },
          { loader: 'less-loader' },
        ]
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '^/api/*': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },

  plugins: debug ? [] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};

module.exports = config;
