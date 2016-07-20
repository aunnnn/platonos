import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ActionCollection extends Mongo.Collection {

}


const Actions = new ActionCollection('Actions');

Actions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// **if we just use Thoughts.schema, _id wouldn't exist!!!
const AnonymousThoughtSchema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },

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
    label: "Category's title",
  },

  created_at: {
    type: Date,
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

const FriendThoughtSchema = new SimpleSchema({
  thought_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'Thought id',
  },
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'User who launched this thought',
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

Actions.subSchema_FriendActivity = FriendActivitySchema;
Actions.subSchema_FriendThought = FriendThoughtSchema;
Actions.subSchema_AnonymousThought = AnonymousThoughtSchema;

Actions.makeSchema = (type) => {

  var contentSchemaType = null;
  if (type === 'THOUGHT') {
    contentSchemaType = AnonymousThoughtSchema;
  } else if (type === 'FRIEND_THOUGHT' || type === 'MY_THOUGHT') {
    contentSchemaType = FriendThoughtSchema;
  } else if (type === 'ACTIVITY') {
    contentSchemaType = FriendActivitySchema;
  } else {
    console.log('Invalid type in "Actions.makeSchema".');
    return null;
  }
  return (new SimpleSchema({
    user_id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      label: 'User that will receive this action',
    },

    type: {
      type: String,
      label: 'Type of Action (THOUGHT, FRIEND_THOUGHT or ACTIVITY)',
      autoValue: function() {
        if (this.isInsert) {
          return type;
        }
      },
      denyUpdate: true,
    },

    content: {
      type: contentSchemaType,
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
  })
  );
  // *-- End new SimpleSchema --*
};

// we can have multiple schemas here dynamically based on type
const type1 = 'THOUGHT';
Actions.attachSchema(Actions.makeSchema(type1), { selector: { type: type1 } });
const type2 = 'FRIEND_THOUGHT';
Actions.attachSchema(Actions.makeSchema(type2), { selector: { type: type2 } });
const type3 = 'MY_THOUGHT';
Actions.attachSchema(Actions.makeSchema(type3), { selector: { type: type3 } });
const type4 = 'ACTIVITY';
Actions.attachSchema(Actions.makeSchema(type4), { selector: { type: type4 } });

export { Actions };
