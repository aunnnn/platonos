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
import CategoryContainer from '../ui/feed/containers/CategoryContainer.jsx';
import SignupPageLayout from '../ui/auth/layouts/SignupPageLayout.jsx';
import ProfileLayout from '../ui/profile/layouts/ProfileLayout.jsx';
const history = syncHistoryWithStore(browserHistory, Store);

// use to prevent manual url enter, so it will be redirected to '/'
const requireAuth = function (nextState, replace) {
  if (!Meteor.user()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export const renderRoutes = () => (
  <Provider store={Store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <Route component={FeedLayout}>
          <IndexRoute component={PersonalFeed} />
          <Route path="global" component={GlobalFeed} onEnter={requireAuth} />
          <Route path="category" onEnter={requireAuth}>
            <Route path=":categoryName" component={CategoryContainer} />
          </Route>
        </Route>
        <Route path="profile" component={ProfileLayout} onEnter={requireAuth}/>
      </Route>
      <Route path="/signup" component={SignupPageLayout} />
    </Router>
  </Provider>
);
