import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import Thoughts from './thoughts.js';

export const insert = new ValidatedMethod({
  name: 'thoughts.insert',
  validate: Thoughts.schema.validator(),
  run({ thought }) {
    if (!this.userId) {
      throw new Meteor.Error('thoughts.insert.notLoggedIn',
        'Must be logged in to publish thought.');
    }
    return Thoughts.insert(thought);
  },
});
