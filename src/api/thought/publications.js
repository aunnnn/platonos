import { Meteor } from 'meteor/meteor';

import { Thoughts } from './thoughts.js';

Meteor.publish('thoughts.all', () => (
  Thoughts.find({}, {
    fields: Thoughts.publicFields,
    disableOplog: true,
    pollingIntervalMs: 30000,
    pollingThrottleMs: 30000,
  })
));

// all user's thoughts for profile page
Meteor.publish('thoughts.getMyThoughts', function getMyThoughts() {
  return Thoughts.find({ user_id: this.userId }, {
    fields: Thoughts.publicFields,
  });
});
