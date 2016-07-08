import { Meteor } from 'meteor/meteor';
import { CronJob } from 'meteor/justinumesh:cron';

// Collections
import { Actions } from '../../src/api/feed/actions.js';
import { Thoughts } from '../../src/api/thought/thoughts.js';
import { Connections } from '../../src/api/connection/connections.js';

Meteor.startup(() => {
  // ===================================================
  // *          Anonymous Thought --> Action           *
  // ===================================================
  // Description: "fetch anonymous thought, turn it into
  //               an action for every user"
  // ------------
  // For every 60 seconds
  const anonymousThoughtToActionsJob = new CronJob('*/60 * * * * *', Meteor.bindEnvironment(
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
  anonymousThoughtToActionsJob.start();
  console.log("BG-Job: 'anonthought-fetch'");
});
