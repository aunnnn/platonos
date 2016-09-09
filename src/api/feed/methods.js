import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Feeds } from './feeds.js';


Feeds.methods = {};

Feeds.methods.getPosts = new ValidatedMethod({
  name: 'feeds.getPosts',
  validate: null,
  // e.g. 0, 10, 20
  run({ yearMonthSequenceCount, startIndex, endIndex }) {
    console.log();
    if (!this.userId) {
      throw new Meteor.Error('feeds.getFeeds.notLoggedIn',
        'Must be logged in.');
    }

    // Don't do this on client since we use local collection.
    if (Meteor.isClient) { return []; }

    const feed = Feeds.find({
      user_id: this.userId,
    }, {
      sort: { created_at: -1 },
      skip: yearMonthSequenceCount,
      limit: 1,
    }).fetch();

    console.log(`feed fetched is ${feed.length}, posts ${feed[0].posts.length} slice [${startIndex},${endIndex}]`);
    if (feed.length < 0) {
      return [];
    }
    const posts = feed[0].posts;
    posts.reverse(); // get most recent
    console.log(`length not zero, example first one ${JSON.stringify(posts[0])}}`);
    return posts.slice(startIndex, endIndex);
  },
});
