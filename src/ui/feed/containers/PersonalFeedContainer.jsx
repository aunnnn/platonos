import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PersonalFeed from '../layouts/PersonalFeed.jsx';
import { Thoughts } from '../../../api/thought/thoughts.js';

export default createContainer(({ currentUser }) => {
  const subAllThoughts = Meteor.subscribe('thoughts.all');
  return {
    thoughts: Thoughts.find({}, { sort: { created_at: -1 } }).fetch(),
    thoughtsReady: subAllThoughts.ready(),
    currentUser,
  };
}, PersonalFeed);
