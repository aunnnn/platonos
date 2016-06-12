import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

Meteor.users.methods = {};

Meteor.users.updateAppProfile = new ValidatedMethod({
  name: 'users.updateAppProfile',
  validate: null,
  run({ user_id, appProfile }) {
    if (!this.userId) {
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
