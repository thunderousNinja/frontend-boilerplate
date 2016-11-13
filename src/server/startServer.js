import express from 'express';
import httpProxy from 'http-proxy';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import reducers from '../reducers';
import renderFullPage from '../utils/renderFullPage'
import routes from '../routes';
import { match, RouterContext } from 'react-router';
import { DEV_SERVER_PORT, ENV, PORT } from '../config';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

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
      target: 'http://localhost:' + DEV_SERVER_PORT
    });
  });
}

app.get('/*', (req, res) => {
  if (ENV === 'development') {
    isomorphicTools.refresh();
  }
  match({
    location: req.url,
    routes,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      
      // get all of the css from webpack isomorphic tools so we can
      // inject it into the html head.
      const assets = isomorphicTools.assets();
      let css = [];
      Object.keys(assets.assets).forEach((v)=> {
        css.push(assets.assets[v]._style);
      });

      // TODO: implement async loading of initial state
      const store = createStore(reducers)
      const html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
      const initialState = store.getState()
      res.send(renderFullPage(
        html, 
        initialState, 
        css, 
        assets.javascript, 
        assets.styles
      ));
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
