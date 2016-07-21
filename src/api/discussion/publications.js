import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Discussions } from './discussions.js';

Meteor.publish('discussion.userDiscussion', function myDiscussion(userId) {
  check(userId, String);
  return Discussions.find({
    $or: [
      { 'thought.user_id': userId },
      { created_by: userId },
    ],
  });
});
