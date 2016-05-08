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
    filename: 'bundle.js',
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
      }
    ]
  },
  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    webpackIsomorphicToolsPlugin.development(true)
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },
};
