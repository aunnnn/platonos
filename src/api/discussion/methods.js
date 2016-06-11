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
    if (discussion && discussion.thought && this.userId === discussion.thought.user_id) {
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
    return Discussions.find({ 'thought._id': thoughtId },
      { sort: { created_at: -1 },
      limit: 3 }).fetch();
  },
});

Discussions.methods.getMyDiscussion = new ValidatedMethod({
  name: 'discussions.getMyDiscussion',
  validate: null,
  run({ thoughtId }) {
    if (!this.userId) {
      throw new Meteor.Error('discussions.getMyDiscussion.notLoggedIn',
        'Must be logged in to get my discussion.');
    }
    return Discussions.findOne({ 'thought._id': thoughtId, created_by: this.userId }) || null;
  },
});
