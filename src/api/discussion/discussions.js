import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class DiscussionCollection extends Mongo.Collection {

}

const Discussions = new DiscussionCollection('Discussions');

if (Meteor.isServer) {
  Discussions._ensureIndex({
    'thought._id': 1,
    created_by: 1,
  });
}

Discussions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


Discussions.schema = new SimpleSchema({

  thought: {
    type: new SimpleSchema({
      _id: { type: String, regEx: SimpleSchema.RegEx.Id },
      user_id: { type: String, regEx: SimpleSchema.RegEx.Id },
      header: { type: String, min: 1 },
      description: { type: String, optional: true },
      category: { type: String, min: 1 },
    }),
    label: 'Embed of Thought',
  },

  created_by: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "user's id who initiated the discussions",
  },

  first_message: {
    type: String,
    min: 0,
  },

  latest_message: {
    type: String,
    min: 0,
  },

  last_active: {
    type: Date,
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

  user_1_is_connecting: {
    type: Boolean,
    autoValue: function() {
      if (this.isInsert) {
        return true;
      }
    },
  },

  user_2_is_connecting: {
    type: Boolean,
    autoValue: function() {
      if (this.isInsert) {
        return true;
      }
    },
  },
});

// every fields are published except these two,
Discussions.publicFields = {
  user_1_is_connecting: 0,
  user_2_is_connecting: 0,
};

Discussions.attachSchema(Discussions.schema);

export { Discussions };

