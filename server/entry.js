import { Meteor } from 'meteor/meteor';

import './fixtures.js';
import './register-api.js';

// =========BACKGROUND JOBS=====================
// : uncomment if needed
import './background-jobs/feed-update.js'; // Undispatched Action => Feed
// import './background-jobs/anonthought-fetch.js'; // Anonymous Thought => Undispatched Action
// =============================================

// run with :
//  meteor --settings development.json

Meteor.startup(() => {
  if (Meteor.settings.facebook) {
    ServiceConfiguration.configurations.upsert({
      service: 'facebook',
    }, {
      $set: {
        // need to use "appId", else it will not work
        appId: Meteor.settings.facebook.appId,
        loginStyle: 'popup',
        secret: Meteor.settings.facebook.secret,
      },
    });
  }
});
