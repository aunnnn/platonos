import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

// collections
import { Feeds } from '../../../api/feed/feeds.js';

// components
import PersonalFeed from '../layouts/PersonalFeed.jsx';

export default createContainer(({ currentUser }) => {
	// **Must change to polling & paging later for better performance
	// Right now it subscribes to one big bucket document of all posts,
	// And Meteor ddp can only diff at topmost level ...
	//
	// TLDR: meteor will fetch the whole bucket every time (thousands of post...),
	// even only a single post is inserted into array of it.
  const subPersonalFeed = Meteor.subscribe('feed.personalFeed');
  const currentYM = moment().format('YYYYMM');
  return {
    // cannot use findOne because Meteor only allow us to pass 'Mongodb cursor' between pub/sub.
    feeds: Feeds.find({ user_id: Meteor.userId(), year_month: currentYM }).fetch(),
    feedsReady: subPersonalFeed.ready(),
    currentUser,
  };
}, PersonalFeed);
