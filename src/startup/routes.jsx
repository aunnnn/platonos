import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

// import store
import Store from '../ui/Store.js';

// import Containers
import AppLayout from '../ui/app/layouts/AppLayout.jsx';
import FeedLayout from '../ui/feed/layouts/FeedLayout.jsx';
import LoginPageLayout from '../ui/auth/layouts/LoginPageLayout.jsx';
import SignupPageLayout from '../ui/auth/layouts/SignupPageLayout.jsx';

const history = syncHistoryWithStore(browserHistory, Store);

export const renderRoutes = () => (
  <Provider store={Store}>
    <Router history={history}>
      <Route path="/" component={AppLayout}>
        <Route path="feed" component={FeedLayout} />
        <Route path="login" component={LoginPageLayout} />
        <Route path="signup" component={SignupPageLayout} />
      </Route>
    </Router>
  </Provider>
);
