import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
// component
import ThoughtPageLayout from '../layouts/ThoughtPageLayout.jsx';
// collection
import { Thoughts } from '../../../api/thought/thoughts.js';

export default createContainer(({ params: { thoughtId } }) => {
  const sub = Meteor.subscribe('thoughts.all');
  return {
    ready: sub.ready(),
    thought: Thoughts.findOne({ _id: thoughtId }),
  };
}, ThoughtPageLayout);
