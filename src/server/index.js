import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import { ENV, PORT } from '../config';

const rootDir = require('path').resolve(__dirname, '..', '..')
const config = require('../../webpacks/config.webpack-isomorphic-tools');

global.isomorphicTools = new WebpackIsomorphicTools(config)
  .development(process.env.NODE_ENV === 'development')
  .server(rootDir, () => {
    require('./startServer');
  });
