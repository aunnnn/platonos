import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Discussions } from './discussions.js';

Discussions.methods = {};

Discussions.methods.insert = new ValidatedMethod({
  name: 'discussions.insert',
  validate: null,
  run({ discussion }) {
    if (!this.userId) {
      throw new Meteor.Error('discussions.insert.notLoggedIn',
        'Must be logged in to publish thought.');
    }
    if (typeof discussion.created_by !== 'undefined' && this.userId === discussion.created_by) {
      throw new Meteor.Error('discussions.insert.noSelfDiscussion',
        'User cannot start a discussion with him/herself');
    }
    return Discussions.insert(discussion);
  },
});

Discussions.methods.getDiscussions = new ValidatedMethod({
  name: 'discussions.getDiscussions',
  validate: null,
  run({ thoughtId }) {
    return Discussions.find({ 'thought._id': thoughtId }, { limit: 3 }).fetch();
  },
});
