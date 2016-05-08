import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './config.development.js';
import path from 'path';
import { DEV_SERVER_PORT } from '../src/config';

let bundleStart = null;
let compiler = Webpack(webpackConfig);

compiler.plugin('compile', function() {
  console.log('📦  Bundling...');
  bundleStart = Date.now();
});

compiler.plugin('done', function() {
  console.log('📦  Bundled in ' + (Date.now() - bundleStart) + 'ms!');
});

let bundler = new WebpackDevServer(compiler, {

  // We need to tell Webpack to serve our bundled application
  // from the build path. When proxying:
  // http://localhost:3000/build -> http://localhost:8080/build
  publicPath: '/build/',

  // Configure hot replacement
  hot: true,

  // The rest is terminal configurations
  quiet: false,
  noInfo: true,
  stats: {
    colors: true
  }
});

bundler.listen(DEV_SERVER_PORT, 'localhost', function() {
  console.log(
    '🚧  Webpack development server listening on port ' + DEV_SERVER_PORT
  );
  console.log('📦  Bundling, please wait...');
});
