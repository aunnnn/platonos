import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class SubDiscussionCollection extends Mongo.Collection {

}

const SubDiscussions = new SubDiscussionCollection('SubDiscussions');


SubDiscussions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


SubDiscussions.schema = new SimpleSchema({

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

  'discussion.created_by': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'User who created the discussion',
  },

  'discussion.first_message': {
    type: String,
    min: 0,
    label: 'First message of the discussion',
  },

  created_by: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "user's id who initiated the subdiscussion",
  },

  first_message: {
    type: String,
    min: 0,
    label: 'first message of this subdiscussion',
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

});

SubDiscussions.attachSchema(SubDiscussions.schema);

export { SubDiscussions };

