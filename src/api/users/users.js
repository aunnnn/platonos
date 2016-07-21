import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
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

  description: {
    type: String,
  },

  // friend_ids: {
  //   type: Array,
  // },

  // followed_categories: {
  //   type: Array,
  // },

  // work: {
  //   type: Array,
  // },

  // 'education.highschool': {
  //   type: Array,
  // },

  // 'education.college': {
  //   type: Array,
  // },

  place: {
    type: String,
  },

  'place.born.name': {
    type: String,
  },

  // YO FUCK IT USER SCHEMA IS NOT STABLE SO YOU KNOW

  'address.live': {
    type: String,
  },

});

if (Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {
    // add app-related user data to a new field

    const isFacebook = user.services.facebook;
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
      description: '',

      friend_ids: [],
      followed_categories: [],
      work: [],
      education: {
        highschool: [],
        college: [],
      },
      place: {
        born: {
          name: '',
          location: {
            lat: '',
            long: '',
          },
        },
        live: {
          name: '',
          location: {
            lat: '',
            long: '',
          },
        },
      },

      active_discussions: {},
      draft_thoughts: [],

      last_active: new Date(),
      last_sub_thought: new Date(),
      last_thought: new Date(),
    };

    // make first time connection & feed bucket
    Connections.insert({ user_id: user._id });
    Feeds.insert({ user_id: user._id });

    return user;
  });
}
