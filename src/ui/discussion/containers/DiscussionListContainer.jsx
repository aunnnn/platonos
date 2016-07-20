import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Discussions } from '../../../api/discussion/discussions.js';
import DiscussionListLayout from '../layouts/DiscussionListLayout.jsx';

export default createContainer(({ currentUser }) => {
  const discussionSub = Meteor.subscribe('discussion.userDiscussion', currentUser._id);

  return {
    currentUser,
    discussionReady: discussionSub.ready(),
    discussions: Discussions.find(
      {
        $or: [
          { 'thought.user_id': currentUser._id },
          { created_by: currentUser._id },
        ],
      },
      { reactive: false }
    ).fetch(),
  };
}, DiscussionListLayout);
