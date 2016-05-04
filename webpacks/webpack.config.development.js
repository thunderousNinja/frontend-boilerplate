import path from 'path';
import webpack from 'webpack';

const build = path.resolve(__dirname, '../public/build');
const eslint = path.resolve(__dirname, '../src');
const main = path.resolve(__dirname, '../src/index.js');

export default {
  devtool: 'eval',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
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
    ]
  },
  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },
};
