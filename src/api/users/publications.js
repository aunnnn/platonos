import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.publish('userData', function () {
  const user = Meteor.users.find({ _id: this.userId }, {
    fields: {
      'services.password.bcrypt': false,
    },
  });
  return user || [];
});

Accounts.onCreateUser((options, user) => {

  // add app-related user data to a new field

  user.appProfile = {
  };

  // if facebook -> fetch profile pic
  if (user.services.facebook) {
    const fbId = user.services.facebook.id;
    user.appProfile.picture = `http://graph.facebook.com/${fbId}/picture/?type=large`;
  }

  return user;
});
