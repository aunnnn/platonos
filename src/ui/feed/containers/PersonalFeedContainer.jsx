import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

// collections
import { Feeds } from '../../../api/feed/feeds.js';

// components
import PersonalFeed from '../layouts/PersonalFeed.jsx';

export default createContainer(() => {
  const subPersonalFeed = Meteor.subscribe('feed.personalFeed');
  const currentYM = moment().format('YYYYMM');
  return {
    // cannot use findOne because Meteor only allow us to pass 'Mongodb cursor' between pub/sub.
    feeds: Feeds.find({ user_id: Meteor.userId(), year_month: currentYM }).fetch(),
    feedsReady: subPersonalFeed.ready(),
  };
}, PersonalFeed);
