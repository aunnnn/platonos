import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ThoughtCollection extends Mongo.Collection {

}


const Thoughts = new ThoughtCollection('Thoughts');

Thoughts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Thoughts.schema = new SimpleSchema({
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "User's Id",
  },

  type: {
    type: String,
    allowedValues: ['NORMAL', 'GLOBAL'],
    label: 'Type of thought',
  },

  header: {
    type: String,
    label: 'Header of thought',
    min: 1,
  },

  description: {
    type: String,
    label: 'Description of thought',
    optional: true, // if force to keep empty string -> wasted of space
  },

  like_count: {
    type: Number,
    defaultValue: 0,
  },

  seen_count: {
    type: Number,
    defaultValue: 0,
  },

  // 'category._id': {
  //   type: String,
  //   regEx: SimpleSchema.RegEx.Id,
  // },
  category: {
    type: Object,
  },

  'category.title': {
    type: String,
    min: 1,
    label: "Category's title"
  },

  created_at: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      }
    },
    denyUpdate: true,
  },

});

Thoughts.attachSchema(Thoughts.schema);

Thoughts.publicFields = {
  type: 1,
  header: 1,
  description: 1,
  category: 1,
  createdAt: 1,
};

export { Thoughts };
