import aliases from './aliases';
import path from 'path';
import webpack from 'webpack';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import { DEV_SERVER_PORT } from '../src/config';

const build = path.resolve(__dirname, '../public/build');
const eslint = path.resolve(__dirname, '../src');
const main = path.resolve(__dirname, '../src/index.js');
const context = path.resolve(__dirname, '..');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./config.webpack-isomorphic-tools')
);

export default {
  devtool: 'inline-source-map',
  context,
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:' + DEV_SERVER_PORT,
    main
  ],
  historyApiFallback: true,
  output: {
    path: build,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    // Everything related to Webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
    publicPath: '/build/'
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      include: eslint
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass?outputStyle=expanded&sourceMap'
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240'
      }
    ]
  },
  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true, // <-------- DISABLE redux-devtools HERE
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    webpackIsomorphicToolsPlugin.development(true)
  ],
  progress: true,
  resolve: {
    alias: aliases,
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
};
