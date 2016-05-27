import { createContainer } from 'meteor/react-meteor-data';
import ThoughtCardLayout from '../layouts/ThoughtCardLayout.jsx';

export default createContainer(() => {
  const thoughtData = {
    category: 'Philisophy',
    type: 'NORMAL',
    header: 'What the fuck man.',
    description: 'askldjaskldjaskldj',
  };
  return {
    thought: thoughtData,
  };
}, ThoughtCardLayout);
