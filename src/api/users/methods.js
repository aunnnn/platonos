import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

Meteor.users.methods = {};

Meteor.users.methods.updateAppProfile = new ValidatedMethod({
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

Meteor.users.methods.followCategory = new ValidatedMethod({
  name: 'users.followCategory',
  validate: null,
  run(category) {
    if (!this.userId) {
      throw new Meteor.Error('users.followCategory',
        'Must be logged in to follow category.');
    }

    check(category, String);

    Meteor.users.update(
      { _id: this.userId },
      {
        $push: {
          'appProfile.followed_categories': JSON.parse(category),
        },
      }
    );
  },
});
