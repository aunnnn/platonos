import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Connections } from '../connection/connections.js';
import { Feeds } from '../feed/feeds.js';
Accounts.onCreateUser((options, user) => {
  // add app-related user data to a new field

  user.appProfile = {};

  if (user.services.facebook) {
    const fbId = user.services.facebook.id;
    user.appProfile.picture = `http://graph.facebook.com/${fbId}/picture/?type=large`;
    user.appProfile.first_name = user.services.facebook.first_name;
    user.appProfile.last_name = user.services.facebook.last_name;
  }

  // make first time connection bucket
  Connections.insert({ user_id: user._id });
  Feeds.insert({ user_id: user._id });
  return user;
});

Meteor.publish('userData', function userData() {
  const user = Meteor.users.find({ _id: this.userId }, {
    fields: {
      'services.password.bcrypt': false,
    },
  });
  return user || [];
});
