import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

import { Discussions } from '../../../api/discussion/discussions.js';
import DiscussionListLayout from '../layouts/DiscussionListLayout.jsx';

export default createContainer(({ currentUser }) => {
  const discussionSub = Meteor.subscribe('discussion.userDiscussion', currentUser._id);
  const rawDiscussions = Discussions.find(
    {
      $or: [
        { 'thought.user_id': currentUser._id },
        { created_by: currentUser._id },
      ],
    },
    { reactive: false }
  ).fetch();

  return {
    currentUser,
    discussionReady: discussionSub.ready(),
    allDiscussions: _
      .chain(rawDiscussions)
      .groupBy(discussion => discussion.thought._id)
      .map((value) => (
        {
          thought: value[0].thought,
          discussions: value,
        }
      )).value(),
  };
}, DiscussionListLayout);
