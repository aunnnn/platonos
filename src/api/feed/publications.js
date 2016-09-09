import { Meteor } from 'meteor/meteor';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Feeds } from '../feed/feeds.js';


const MAX_POSTS = 300;
Meteor.publish('feed.personalFeed', function personalFeed(limit) {
  // new SimpleSchema({
  //   listId: { type: String },
  // }).validate({ limit });
  const ymcode = Feeds.currentYearMonthCode();
  const feed = Feeds.find({
    user_id: this.userId,
    year_month: ymcode,
  }, {
    fields: {
      posts: { $slice: -(Math.min(limit, MAX_POSTS)) },
    },
  });
  console.log(`ym ${ymcode}, feed count = ${feed.count()}`);
  return feed;
});
