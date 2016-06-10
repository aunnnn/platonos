import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Discussions } from './discussions.js';

Discussions.methods = {};

Discussions.methods.insert = new ValidatedMethod({
  name: 'discussions.insert',
  validate: null,
  run({ discussion }) {
    if (!this.userId) {
      throw new Meteor.Error('thoughts.insert.notLoggedIn',
        'Must be logged in to publish thought.');
    }
    return Discussions.insert(discussion);
  },
});
