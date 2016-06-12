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
