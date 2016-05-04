import App from './containers/App';
import Foo from './containers/Foo';
import Home from './containers/Home';
import React from 'react';
import { IndexRoute, Route } from 'react-router'

export default (
<Route path="/" component={ App }>
  <IndexRoute component={ Home } />
  <Route path="foo" component={ Foo } />
</Route>
);
