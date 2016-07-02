import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Thoughts } from '../thought/thoughts.js';

class ActionCollection extends Mongo.Collection {

}


const Actions = new ActionCollection('Actions');

Actions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const AnonymousThoughtSchema = Thoughts.schema;
const FriendThoughtSchema = new SimpleSchema({
  thought_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'Thought id',
  },
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "User who launched this thought",
  },
  user_picture: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Url of user profile picture',
  },

  user_fullname: {
    type: String,
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

  category: {
    type: Object,
  },

  'category.title': {
    type: String,
    min: 1,
    label: "Category's title",
  },

  created_at: {
    type: Date,
    denyUpdate: true,
  },

  attachment: {
    type: new SimpleSchema({
      type: {
        type: String,
        allowedValues: ['THOUGHT', 'DISCUSSION', 'EXTERNAL_URL'],
        label: 'Type of attachment',
      },
      value: {
        type: String,
      },
    }),
    optional: true,
    label: 'Attachment of this thought',
  },

});

const FriendActivitySchema = new SimpleSchema({

  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "Friend's userId",
  },
  user_picture: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: "Friend's picture url",
  },
  user_fullname: {
    type: String,
    min: 0,
    label: "Friend's full name",
  },

  action: {
    type: String,
    allowedValues: [
      'respond', // respond to Thought
      'like', // like Thought or Discussion
      // etc. change profile, thought featured on Top Global Debate
    ],
    label: "Action of friend's activity",
  },
  object_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'Referenced Thought or Discussion Id (or any Id in the future)',
  },
});

// Currently these aren't used to check anything, they are just for references.
// We can be more safe later.
Actions.subSchema_FriendActivity = FriendActivitySchema;
Actions.subSchema_FriendThought = FriendThoughtSchema;
Actions.subSchema_AnonymousThought = AnonymousThoughtSchema;

Actions.schema = new SimpleSchema({
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'User that will receive this action',
  },

  type: {
    type: String,
    allowedValues: [
      'THOUGHT',
      'FRIEND_THOUGHT',
      'ACTIVITY', // activity of friends, e.g., likes, respond.
      // etc... can be added in future
    ],
    label: 'Type of Action (THOUGHT, FRIEND_THOUGHT or ACTIVITY)',
  },

  content: {
    type: Object,
    label: 'Content, depends on type of action',
  },

  dispatched: {
    type: Boolean,
    label: 'Whether this action is already dispatched to user feed or not',
    autoValue: function() {
      if (this.isInsert) {
        return false;
      }
    },
  },
  created_at: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      }
    },
  },

});

// Actions.attachSchema(Actions.schema);

export { Actions };
