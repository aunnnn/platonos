import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Discussions } from './discussions.js';

Discussions.methods = {};

Discussions.methods.insert = new ValidatedMethod({
  name: 'discussions.insert',
  validate: null,
  run({ discussion }) {
    if (!this.userId) {
      throw new Meteor.Error('discussions.insert.notLoggedIn',
        'Must be logged in to create discussion.');
    }
    if (discussion && discussion.thought && this.userId === discussion.thought.user_id) {
      throw new Meteor.Error('discussions.insert.noSelfDiscussion',
        'User cannot start a discussion with him/herself');
    }
    return Discussions.insert(discussion);
  },
});

// get 3 discussions and not from the user himself
Discussions.methods.getPreviewDiscussions = new ValidatedMethod({
  name: 'discussions.getPreviewDiscussions',
  validate: null,
  run({ thoughtId }) {
    if (!this.userId) {
      throw new Meteor.Error('discussions.getPreviewDiscussions.notLoggedIn',
        'Must be logged in.');
    }
    return Discussions.find({
      'thought._id': thoughtId,
      created_by: { $ne: this.userId },
    }, {
      sort: { created_at: -1 },
      limit: 3,
      fields: Discussions.publicFields,
    }).fetch();
  },
});

Discussions.methods.getThoughtPageDiscussions = new ValidatedMethod({
  name: 'discussions.getThoughtPageDiscussions',
  validate: null,
  run(stringify) {
    const { thoughtId, currentUserId } = JSON.parse(stringify);
    if (!this.userId) {
      throw new Meteor.Error('discussions.getThoughtPageDiscussions.notLoggedIn',
        'Must be logged in.');
    }
    return Discussions.find({
      'thought._id': thoughtId,
    }, {
      fields: Discussions.publicFields,
    }).fetch();
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
    return Discussions.findOne({ 'thought._id': thoughtId, created_by: this.userId }, {
      fields: Discussions.publicFields,
    }) || null;
  },
});

Discussions.methods.setCurrentUserConnectionState = new ValidatedMethod({
  name: 'discussions.setCurrentUserConnectionState',
  validate: new SimpleSchema({
    discussion_id: { type: String, regEx: SimpleSchema.RegEx.Id },
    is_connecting: { type: Boolean },
  }).validator(),
  run({ discussion_id, is_connecting }) {
    if (!this.userId) {
      throw new Meteor.Error('discussions.getConnectionState.notLoggedIn',
        'Must be logged in to get connection state.');
    }
    const discussion = Discussions.findOne({ _id: discussion_id });
    // if current user is author
    if (this.userId === discussion.thought.user_id) {
      Discussions.update({ _id: discussion_id }, { $set: { user1_is_connecting: is_connecting } });
    } else if (this.userId === discussion.created_by) {
      Discussions.update({ id: discussion_id }, { $set: { user_2_is_connecting: is_connecting } });
    } else {
      throw new Meteor.Error('discussions.setCurrentUserConnectionState.wrongUser',
        'Current user is neither thought or discussion author');
    }
  },
});
