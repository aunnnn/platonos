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
    const categoryObj = JSON.parse(category);
    check(categoryObj, Object);

    Meteor.users.update(
      { _id: this.userId },
      {
        $push: {
          'appProfile.followed_categories': {
            _id: categoryObj._id,
            title: categoryObj.title,
          },
        },
      }
    );
  },
});

Meteor.users.methods.unfollowCategory = new ValidatedMethod({
  name: 'users.unfollowCategory',
  validate: null,
  run(categoryId) {
    if (!this.userId) {
      throw new Meteor.Error('users.unfollowCategory',
        'Must be logged in to unfollow category.');
    }

    check(categoryId, String);

    const obj = {
      $pull: {
        'appProfile.followed_categories': {
          _id: categoryId,
        },
      },
    };

    Meteor.users.update(
      { _id: this.userId },
      obj,
      { multi: true }
    );
  },
});
