import { Meteor } from 'meteor/meteor';

import { Thoughts } from './thoughts.js';

Meteor.publish('thoughts.all', function thoughtsAll() {
  return Thoughts.find({}, {
    fields: Thoughts.publicFields,
  });
});

// all user's thoughts for profile page
Meteor.publish('thoughts.getMyThoughts', function getMyThoughts() {
  return Thoughts.find({ user_id: this.userId }, {
    fields: Thoughts.publicFields,
  });
});
