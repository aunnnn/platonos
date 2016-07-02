import { Meteor } from 'meteor/meteor';
import { CronJob } from 'meteor/justinumesh:cron';
import moment from 'moment';

// Collections
import { Actions } from '../src/api/feed/actions.js';
import { Feeds } from '../src/api/feed/feeds.js';

Meteor.startup(() => {
  // Example

  // For every 4 seconds
  const job = new CronJob('*/4 * * * * *', Meteor.bindEnvironment(() => {
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
        console.log('--- --- Updating Feeds...');
        Feeds.update(
          { user_id: user._id, year_month: currentYM },
          { $push: { posts: targetAction } },
          (err) => {
            if (err) {
              console.log(`Update error: ${err.reason}`);
            } else {
              console.log(`..........will set dispatched of ${targetAction._id} to true `);
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
              console.log(`Action => Feed, user: ${user.appProfile.first_name}`);
            }
          });
      }
    });
  }), null, true, 'Asia/Bangkok');
  job.start();
});
