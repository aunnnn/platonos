import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, push } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
// import store
import Store from '../ui/Store.js';

// import Containers
import AppContainer from '../ui/app/containers/AppContainer.jsx';
// import FeedLayout from '../ui/feed/layouts/FeedLayout.jsx';
import PersonalThoughtFeed from '../ui/feed/layouts/PersonalThoughtFeed.jsx';
import LoginPageLayout from '../ui/auth/layouts/LoginPageLayout.jsx';
import SignupPageLayout from '../ui/auth/layouts/SignupPageLayout.jsx';

const history = syncHistoryWithStore(browserHistory, Store);

// check auth
function requireAuth(nextState, replace) {
  if (!Meteor.user()) {
    console.log("no user");
    // replace({
    //   pathname: '/login',
    //   state: { nextPathname: nextState.location.pathname },
    // });
    Store.dispatch(push('/login'));
  } else {
    console.log("with user");
  }
}


export const renderRoutes = () => (
  <Provider store={Store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={PersonalThoughtFeed} onEnter={requireAuth}>
          <Route path=":feedType" />
        </IndexRoute>
      </Route>
      <Route path="/login" component={LoginPageLayout} />
      <Route path="/signup" component={SignupPageLayout} />
    </Router>
  </Provider>
);
