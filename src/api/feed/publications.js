import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { Feeds } from '../feed/feeds.js';

Meteor.publish('feed.personalFeed', function personalFeed() {
  return Feeds.find({
    user_id: this.userId,
    year_month: moment().format('YYYYMM'),
  });
});
