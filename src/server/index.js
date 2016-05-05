import { ENV, PORT } from '../config';

var WebpackIsomorphicTools = require('webpack-isomorphic-tools')

const rootDir = require('path').resolve(__dirname, '..', '..')

var Webpack_isomorphic_tools = require('webpack-isomorphic-tools')

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.isomorphicTools = new WebpackIsomorphicTools(require('../../webpacks/config.webpack-isomorphic-tools'))
  .development(process.env.NODE_ENV === 'development')
  .server(rootDir, function() {
    require('./startServer');
  });
