import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { createContainer } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';

// collections
import { Feeds } from '../../../api/feed/feeds.js';

// components
import PersonalFeed from '../layouts/PersonalFeed.jsx';

// Local Feed Collection: 1 document = 1 post
// 1. posts are fetched from methods of Feeds
const ClientFeeds = new Mongo.Collection(null);

// 2. these two reactive variables keep track of range to fetch posts
//
// TLDR; currentYMSequence moves between Feed documents
//       currentYMStartIndex moves inside 'posts' of that document
//
// 2.1 currentYMSequence is 0, then 1, 2, 3... incrementally:
//      it doesn't care about actual YM. e.g. 201607 or whatever,
//      the backend uses skip = currentYMSequence & limit = 1 to get one feed document.
const currentYMSequence = new ReactiveVar(0);

// 2.2 currentYMStartIndex is 0, then incremented by 5 (or whatever constant)
//      it's set to 0 when currentYMSequence is increased.
//      (when it's move on to the next document)
const currentYMStartIndex = new ReactiveVar(0);

// 3. handleScroll() in PersonalFeed call fetch method
// 4. this function is called (via props) after it succesfully received new posts
//    to insert into local collection
// 5. 2.1 & 2.2 are updated, so props are rerun and rerendered.
const didFetchMorePosts = (posts) => {
  posts.forEach((post) => {
    ClientFeeds.insert(post);
  });

  const count = posts.length;
  const currentStart = currentYMStartIndex.get();

  let nextYM = currentYMSequence.get();
  let nextStart = currentStart + count;

  // assume end of month
  if (count < 5) {
    nextStart = 0;
    nextYM = nextYM + 1;
  } else {
    nextStart = currentStart + count;
  }

  // updated reactive var, so it will rerender the feed.
  currentYMStartIndex.set(nextStart);
  currentYMSequence.set(nextYM);
};

export default createContainer(({ currentUser }) => {
  return {
    // feeds: all posts that are reteived for this user
    // feeds: Feeds.find({ user_id: Meteor.userId() }).fetch(),
    // feedsReady: subPersonalFeed.ready(),
    currentYMSequence: currentYMSequence.get(),
    currentYMStartIndex: currentYMStartIndex.get(),
    posts: ClientFeeds.find({}, { sort: { created_at: -1 } }).fetch(),
    didFetchMorePosts,
    currentUser,
  };
}, PersonalFeed);
