import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Actions } from './actions';
import moment from 'moment';

class FeedCollection extends Mongo.Collection {

}

const Feeds = new FeedCollection('Feeds');

// Get current year month code to handle with Feeds
Feeds.currentYearMonthCode = () => {
  const ym = moment().format('YYYYMM');
  return parseInt(ym, 10); // radix 10 (e.g. base 10)
};

Feeds.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Feeds.schema = new SimpleSchema({
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'User that owns the feed',
  },

  // This should be Int so it can be sorted easily.
  year_month: {
    type: Number,
    label: 'YEARMONTH code (e.g. 201606)',
    autoValue: function() {
      if (this.isInsert) {
        return Feeds.currentYearMonthCode();
      }
    },
    denyUpdate: true,
  },

  posts: {
    type: [Object],
    label: 'Post (Action) on feed',
    defaultValue: [],
    blackbox: true, // to make simple-schema ignore strict checking here...
  },
});

Feeds.attachSchema(Feeds.schema);

export { Feeds };
