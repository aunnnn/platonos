import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Thoughts } from './thoughts.js';
import { DraftThoughts } from './draftThoughts.js';

Thoughts.methods = {};

Thoughts.methods.insert = new ValidatedMethod({
  name: 'thoughts.insert',
  validate: null,
  run({ thought }) {
    if (!this.userId) {
      throw new Meteor.Error('thoughts.insert.notLoggedIn',
        'Must be logged in to publish thought.');
    }
    return Thoughts.insert(thought);
  },
});

DraftThoughts.methods = {};

DraftThoughts.methods.insert = new ValidatedMethod({
  name: 'draftThoughts.insert',
  validate: null,
  run({ draftThought }) {
    if (!this.userId) {
      throw new Meteor.Error('draftThought.insert.notLoggedIn',
        'Must be logged in to save thought.');
    }
    return DraftThoughts.insert(draftThought);
  },
});
