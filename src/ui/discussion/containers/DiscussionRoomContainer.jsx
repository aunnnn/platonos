import { createContainer } from 'meteor/react-meteor-data';
import DiscussionRoomLayout from '../layouts/DiscussionRoomLayout.jsx';

export default createContainer(({ params: { discussionId }, currentUser }) => {
  return {
    currentUser,
    discussionId,
  };
}, DiscussionRoomLayout);
