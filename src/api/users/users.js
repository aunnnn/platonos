import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const UserAppProfileSchema = new SimpleSchema({
  picture: {
    type: SimpleSchema.RegEx.Url,
    label: "Link of user's profile picture.",
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

  description: {
    type: String,
  },

});
