import React from 'react';
import ReactDOM from 'react-dom';
import reducers from './reducers'
import routes from './routes';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router'

const initialState = window.__INITIAL_STATE__
const store = createStore(reducers, initialState)
console.log(initialState);
ReactDOM.render(
  <Provider store={store}>
    <Router routes={ routes } history={ browserHistory } />
  </Provider>,
  document.getElementById('app-mount')
);
