import { Meteor } from 'meteor/meteor';

import '../src/api/users/publications.js';


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
