import App from './components/App';
import Home from './containers/Home';
import React from 'react';
import { IndexRoute, Route } from 'react-router'

export default (
<Route path="/" component={ App }>
  <IndexRoute component={ Home } />
</Route>
);
