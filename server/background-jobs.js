import { Meteor } from 'meteor/meteor';
import { CronJob } from 'meteor/justinumesh:cron';
import moment from 'moment';

// Collections
import { Actions } from '../src/api/feed/actions.js';
import { Feeds } from '../src/api/feed/feeds.js';
import { Thoughts } from '../src/api/thought/thoughts.js';
import { Connections } from '../src/api/users/connections.js';


Meteor.startup(() => {
  // ================ PRIMER ===========================
  // When does a new Action get generated in the system?:
  //
  //  1. A user launch thought
  //      --> FRIEND_THOUGHT action
  //      --to--> all friends
  //  2. Anonymous thought is picked by our system for a user
  //      --> THOUGHT action
  //      --to--> that user.
  //  3. A user change profile, discuss with others etc. anything
  //      that his/her friends should *CARE ABOUT*
  //      --> ACTIVITY action
  //      --to--> all friends


  // ===================================================
  // *               Actions --> Feeds                 *
  // ===================================================
  // Description: "add undispatched action to user's feed"
  // ------------
  // For every 5 seconds (or whatever)
  // - For every users,
  // --- 1. Find documents in Action that is marked 'dispatched: false',
  // --- 2. Take the document by some algorithm.
  //        e.g. earliest undispatched one, most relevance, etc.
  // --- 3. Delete the key 'dispatched', then insert into user feed.
  // --- 4. Update that document in Action collection by setting 'dispatched: false' to 'true'

  // *Meteor.bindEnvironment is needed for third-party async callback code to be able to used in Meteor.
  const undispatchedActionsToFeedJob = new CronJob('*/5 * * * * *', Meteor.bindEnvironment(() => {
    console.log('Checking undispatched actions...');
    const currentYM = moment().format('YYYYMM');
    Meteor.users.find().forEach(function(user) {
      // find all actions directed to this user
      const allActions = Actions.find(
        { user_id: user._id, dispatched: false },
        { sort: { created_at: 1 } }).fetch();
      if (allActions.length > 0) {
        // *update user's feed
        // e.g. insert earliest one that is not dispatched.
        const targetAction = allActions[0];

        // remove 'dispatched' before push into feed
        delete targetAction.dispatched;

        Feeds.update(
          { user_id: user._id, year_month: currentYM },
          { $push: { posts: targetAction } },
          (err) => {
            if (err) {
              console.log(`Update error: ${err.reason}`);
            } else { 
              Actions.update(
                { _id: targetAction._id },
                { $set:
                  { dispatched: true },
                },
                { selector: {
                  type: targetAction.type,
                },
              }
              );
              // console.log(`Action => Feed, user: ${user.appProfile.first_name}`);
            }
          });
      }
    });
  }), null, true, 'Asia/Bangkok');


  // ===================================================
  // *          Anonymous Thought --> Action           *
  // ===================================================
  // Description: "fetch anonymous thought, make it an action for every user"
  // ------------
  // For every 20 seconds
  const anonymousThoughtToActionsJob = new CronJob('*/20 * * * * *', Meteor.bindEnvironment(
    () => {
      console.log('Fetching anonymous thoughts into actions...');
      const allThoughtsCount = Thoughts.find().count();
      Meteor.users.find().forEach((user) => {
        const i = Math.floor(Math.random() * allThoughtsCount);
        const thought = Thoughts.find({}, { skip: i, limit: 1 }).fetch()[0];
        const userId = user._id;
        const friendIds = Connections.findOne({ user_id: userId }).friends.map(
          (friend) => (friend.user_id)
        );
        // not by him/herself, not by friends and not received yet
        if (thought.user_id !== userId &&
            friendIds.indexOf(thought.user_id) === -1 &&
            thought.dispatched_to.indexOf(userId) === -1) {
          const action = {
            user_id: userId,
            type: 'THOUGHT',
            content: thought,
          };
          Actions.insert(action);
          // console.log(`Thought => Action, user: ${user.appProfile.first_name}`);
        }
      });
    }
  ), null, true, 'Asia/Bangkok');

  undispatchedActionsToFeedJob.start();
  anonymousThoughtToActionsJob.start();
});
