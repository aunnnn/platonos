import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
// import store
import Store from '../ui/Store.js';

// import Layouts
import AppContainer from '../ui/app/containers/AppContainer.jsx';
import FeedLayout from '../ui/feed/layouts/FeedLayout.jsx';
import PersonalFeedContainer from '../ui/feed/containers/PersonalFeedContainer.jsx';
import GlobalFeedContainer from '../ui/feed/containers/GlobalFeedContainer.jsx';
import CategoryContainer from '../ui/feed/containers/CategoryContainer.jsx';
import AddCategoryContainer from '../ui/feed/containers/AddCategoryContainer.jsx';
import SignupPageLayout from '../ui/auth/layouts/SignupPageLayout.jsx';
import ProfileLayout from '../ui/profile/layouts/ProfileLayout.jsx';
import WriteThoughtPageLayout from '../ui/thought/layouts/WriteThoughtPageLayout.jsx';
import ProfileIndexLayout from '../ui/profile/layouts/ProfileIndexLayout.jsx';
import ProfileFriendsLayout from '../ui/profile/layouts/ProfileFriendsLayout.jsx';
import ProfileAboutLayout from '../ui/profile/layouts/ProfileAboutLayout.jsx';

const history = syncHistoryWithStore(browserHistory, Store);

// use to prevent manual *valid* url enter, so it will be redirected to '/'
// E.g. -Anonymous user enters with 'localhost/global'
//      -He is not logged in, so AppLayout will show login page correctly.
//      -However, his browser's url is still 'localhost/global', but with login page shown.
//      -To fix this, requireAuth onEnter will redirect these *valid* url entered
//       by non-loggedin user to home page
function requireAuth(nextState, replace) {
  if (!Meteor.user()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

function invalidURL(nextState, replace) {
  replace({
    pathname: '/',
    state: { nextPathname: nextState.location.pathname },
  });
}

export const renderRoutes = () => (
  <Provider store={Store}>
    <Router
      history={history}
    >
      {
        // root
      }
      <Route path="/" component={AppContainer}>

        {
          // feed
        }
        <Route component={FeedLayout}>
          <IndexRoute component={PersonalFeedContainer} />
          <Route path="global" component={GlobalFeedContainer} onEnter={requireAuth} />
          <Route path="category" onEnter={requireAuth}>
            <Route path=":categoryName" component={CategoryContainer} />
          </Route>
          <Route path="categories" component={AddCategoryContainer} onEnter={requireAuth} />
        </Route>

        {
          // profile
        }
        <Route path="profile" component={ProfileLayout} onEnter={requireAuth} >
          <IndexRoute component={ProfileIndexLayout} />
          <Route path="friends" component={ProfileFriendsLayout} onEnter={requireAuth} />
          <Route path="about" component={ProfileAboutLayout} onEnter={requireAuth} />
        </Route>

        {
          // write
        }
        <Route path="write" component={WriteThoughtPageLayout} onEnter={requireAuth} />
      </Route>

      {
        // signup
      }
      <Route path="/signup" component={SignupPageLayout} />

      {
        // invalid url, maybe changed to 404 Not Found later
      }
      <Route path="*" onEnter={invalidURL} />
    </Router>
  </Provider>
);
