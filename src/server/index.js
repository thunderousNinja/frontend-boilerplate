import express from 'express';
import httpProxy from 'http-proxy';
import intializeWebpack from '../../webpacks/intializeWebpack';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../routes';
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

app.get('/*', (req, res) => {
  match({
    location: req.url,
    routes,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.render('index', {
        content: ReactDOMServer.renderToString(
          <RouterContext {...renderProps} />
        )
      });
    } else {
      res.status(404).send('Not found')
    }
  });
});

proxy.on('error', (e) => {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(PORT, () => {
  console.log('🖥  Environment: ' + ENV);
  console.log('🌍  Listening: http://localhost:' + PORT);
});
