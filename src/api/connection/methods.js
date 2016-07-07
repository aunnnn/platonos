import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Connections } from './connections.js';

Connections.methods = {};

Connections.methods.getAllFriends = new ValidatedMethod({
  name: 'connections.getAllFriends',
  validate: null,
  run() {
    if (!this.userId) {
      throw new Meteor.Error('connections.getAllFriends.notLoggedIn',
        'Must be logged in to get all friends.');
    }
    return Connections.find({ user_id: this.userId });
  },
});
