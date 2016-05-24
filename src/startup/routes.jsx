import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
// import store
import Store from '../ui/Store.js';

// import Containers
import AppContainer from '../ui/app/containers/AppContainer.jsx';
import FeedLayout from '../ui/feed/layouts/FeedLayout.jsx';
import PersonalFeed from '../ui/feed/layouts/PersonalFeed.jsx';
import GlobalFeed from '../ui/feed/layouts/GlobalFeed.jsx';
import CategoryFeed from '../ui/feed/layouts/CategoryFeed.jsx';
import SignupPageLayout from '../ui/auth/layouts/SignupPageLayout.jsx';

const history = syncHistoryWithStore(browserHistory, Store);


export const renderRoutes = () => (
  <Provider store={Store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <Route component={FeedLayout}>
          <IndexRoute component={PersonalFeed} />
          <Route path="global" component={GlobalFeed} />
          <Route path="category" component={CategoryFeed} />
        </Route>
      </Route>
      <Route path="/signup" component={SignupPageLayout} />
    </Router>
  </Provider>
);
