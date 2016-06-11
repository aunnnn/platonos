import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  // add app-related user data to a new field

  user.appProfile = {};

  if (user.services.facebook) {
    const fbId = user.services.facebook.id;
    user.appProfile.picture = `http://graph.facebook.com/${fbId}/picture/?type=large`;
    user.appProfile.first_name = user.services.facebook.first_name;
    user.appProfile.last_name = user.services.facebook.last_name;
  }

  return user;
});

Meteor.users.methods = {};

Meteor.users.updateAppProfile = new ValidatedMethod({
  name: 'users.updateAppProfile',
  validate: null,
  run({ user_id, appProfile }) {
    if(!this.userId) {
      throw new Meteor.Error('users.updateAppProfile.notLoggedIn',
        'Must be logged in to update user data.');
    }
    return Meteor.users.upsert({
      _id: user_id,
    }, {
      $set: {
        appProfile,
      },
    });
  },
});
