import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import GlobalFeed from '../layouts/GlobalFeed.jsx';
import { Thoughts } from '../../../api/thought/thoughts.js';
export default createContainer(() => {
  const subAllThoughts = Meteor.subscribe('thoughts.all');
  return {
    thoughts: Thoughts.find({ type: 'GLOBAL' }, { sort: { created_at: -1 } }).fetch(),
    thoughtsReady: subAllThoughts.ready(),
  };
}, GlobalFeed);
