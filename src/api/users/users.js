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
