import { createContainer } from 'meteor/react-meteor-data';
import ThoughtCardLayout from '../layouts/ThoughtCardLayout.jsx';

export default createContainer(() => {
  const thoughtData = {
    category: 'World',
    type: 'NORMAL',
    header: 'I think we can end terrorism by nuclear warhead.',
    description: 'I really believe that nuclear can put an end to every problem.',
  };
  return {
    thought: thoughtData,
  };
}, ThoughtCardLayout);
