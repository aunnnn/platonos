import { createContainer } from 'meteor/react-meteor-data';
import ThoughtCardLayout from '../layouts/ThoughtCardLayout.jsx';

export default createContainer(() => {
  const thoughtData = {
    category: 'World',
    type: 'GLOBAL',
    header: 'I think we can end terrorism by nuclear warhead.',
    description: 'I really believe that nuclear can put an end to every problem. One blow and everything is gone. I think you need to sacrifice some lifes for the better of whole you know.',
    discussions: [
      'Whoa, chill the fuck out man. nuclear cannot solve my money problem duh.',
      'I think the most important problem in the world right now is not terrorism. but the way people choose to solve it.. look at the past 10 years.. the world was trying to solve it but is it better now ?',
    ],
  };
  return {
    thought: thoughtData,
  };
}, ThoughtCardLayout);
