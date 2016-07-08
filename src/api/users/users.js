import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Connections } from '../connection/connections.js';
import { Feeds } from '../feed/feeds.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const UserAppProfileSchema = new SimpleSchema({
  picture: {
    type: SimpleSchema.RegEx.Url,
    label: "Link of user's profile picture (e.g. from FB)",
  },

  first_name: {
    type: String,
    min: 0,
  },

  last_name: {
    type: String,
    min: 0,
  },

  address: {
    type: String,
  },

  'address.born': {
    type: String,
  },

  'address.lives': {
    type: String,
  },

  description: {
    type: String,
  },

});

Accounts.onCreateUser((options, user) => {
  // add app-related user data to a new field

  const isFacebook = check(user.services.facebook, Object);

  const picture = isFacebook ?
      `http://graph.facebook.com/${user.services.facebook.id}/picture/?type=large`
      :
      'http://i.memeful.com/media/post/3M2b6M2_700w_0.jpg';

  const first_name = isFacebook ?
      user.services.facebook.first_name : '';

  const last_name = isFacebook ?
      user.services.facebook.last_name : '';

  user.appProfile = {
    picture,
    first_name,
    last_name,
  };

  // make first time connection bucket
  Connections.insert({ user_id: user._id });
  Feeds.insert({ user_id: user._id });
  return user;
});
