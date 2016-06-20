import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


class FeedCollection extends Mongo.Collection {

}

const FriendActivitySchema = new SimpleSchema({
  friend_info: {
    type: new SimpleSchema({
      user_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        label: "Friend's Id",
      },
      picture: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        label: "Friend's picture url",
      },
      first_name: {
        type: String,
        min: 0,
        label: "Friend's first name",
      },
      last_name: {
        type: String,
        min: 0,
        label: "Friend's last name",
      },
    }),
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

const FeedPostSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [
      'THOUGHT', // personal /global thought
      'ACTIVITY', // activity of friends, e.g., likes, respond.
      // etc. SPECIAL: special, custom content from our website
    ],
    label: "Type of Feed's Post (THOUGHT or ACTIVITY)",
  },
  content: {
    type: Object,
    label: 'Content of post, either Thought or Activity',
  },

});


const Feeds = new CategoryCollection('Categories');

Feeds.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Feeds.subSchema_FeedPost = FeedPostSchema;
Feeds.subSchema_FriendActivity = FriendActivitySchema;

Feeds.schema = new SimpleSchema({
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'User that owns the feed',
  },

  year_month: {
    type: String,
    regEx: /^[0-9]+$/,
    label: 'YEARMONTH code (e.g. 201606)',
  },

  posts: [FeedPostSchema],


});

Feeds.attachSchema(Feeds.schema);

export { Feeds };
