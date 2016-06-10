import { Meteor } from 'meteor/meteor';

import { Thoughts } from './thoughts.js';

Meteor.publish('thoughts.all', function thoughtsAll() {
  return Thoughts.find({}, {
    fields: Thoughts.publicFields,
  });
});
