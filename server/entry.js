import { Meteor } from 'meteor/meteor';

// import './fixtures.js';
import './register-api.js';

// =========BACKGROUND JOBS=====================
// : Comment if not needed
import './background-jobs/feed-update.js';
import './background-jobs/anonthought-fetch.js';
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
