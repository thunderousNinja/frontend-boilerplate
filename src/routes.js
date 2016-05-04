import App from './containers/App';
import Foo from './containers/Foo';
import Home from './containers/Home';
import React from 'react';
import { browserHistory, IndexRoute, Router, Route } from 'react-router'

export default (
<Router history={ browserHistory }>
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="foo" component={ Foo } />
  </Route>
</Router>
);
