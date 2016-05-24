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
import PersonalFeed from '../ui/feed/components/PersonalFeed.jsx';
import GlobalFeed from '../ui/feed/components/GlobalFeed.jsx';
import LoginPageLayout from '../ui/auth/layouts/LoginPageLayout.jsx';
import SignupPageLayout from '../ui/auth/layouts/SignupPageLayout.jsx';

const history = syncHistoryWithStore(browserHistory, Store);

// check auth
function requireAuth(nextState, replace) {
  if (!Meteor.user()) {
    console.log("no user");
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
    // Store.dispatch(push('/login'));
  } else {
    console.log("with user");
  }
}


export const renderRoutes = () => (
  <Provider store={Store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <Route component={FeedLayout}>
          <IndexRoute component={PersonalFeed}/>
          <Route path="global" component={GlobalFeed}/>
        </Route>
      </Route>
      <Route path="/signup" component={SignupPageLayout} />
    </Router>
  </Provider>
);
