import App from '../containers/App';
import express from 'express';
import httpProxy from 'http-proxy';
import intializeWebpack from '../../webpacks/intializeWebpack';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ENV, PORT } from '../config';

const app = express();
const publicPath = path.resolve(__dirname, '../../public');
const proxy = httpProxy.createProxyServer();

app.set('views', 'src');
app.set('view engine', 'jade');
app.use(express.static(publicPath));

if (ENV === 'development') {
  // any requests to localhost:3000/build is proxied to webpack-dev-server.
  app.all('/build/*', function(req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });

  intializeWebpack();
}

app.get('/*', function(req, res) {
  var response = ReactDOMServer.renderToString(<App/>);
  res.render('index', {
    content: response
  });
});

proxy.on('error', (e) => {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(PORT, () => {
  console.log('Environment: ' + ENV);
  console.log('Listening: http://localhost:' + PORT);
});
