import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Actions } from './actions';
import moment from 'moment';

class FeedCollection extends Mongo.Collection {

}

const Feeds = new FeedCollection('Feeds');

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

  year_month: {
    type: String,
    regEx: /^[0-9]+$/,
    label: 'YEARMONTH code (e.g. 201606)',
    autoValue: function() {
      if (this.isInsert) {
        return moment().format('YYYYMM');
      }
    },
    denyUpdate: true,
  },

  posts: {
    type: [Actions.schema],
    label: 'Post (Action) on feed',
    defaultValue: [],
  },
});

// Feeds.attachSchema(Feeds.schema);

export { Feeds };
