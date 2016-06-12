import { createContainer } from 'meteor/react-meteor-data';

// layouts
import PersonalFeed from '../../feed/layouts/PersonalFeed.jsx';

export default createContainer(() => {
  const data = [
    {
      category: {
        id: '',
        title: 'Science',
      },
      type: 'GLOBAL',
      header: 'I think peter thiel is right about this. Free speech is very important but we cannot ignore the fact that we cannot divide every form of speech in the world into 2 categories, good and bad, then simply say that every bad speech need protection. I think there is variety of bad speech and there is bad speech that deserve protection. and the "false speech" create no use to anyone.',
      description: '',
      discussions: [
        'When you say that you cannot say false speech. then it is no free speech at all.',
        'what is false speech that you were saying.',
        'I believe that Thiel always thinks about the concept of Free speech all the time. He is Libetarian. The conceptof Free speech is like their fundamental way of thinking about everything. but the method he\'s done has no good to anybody. especially Free Speech itself',
      ],
    },
    {
      category: {
        id: '',
        title: 'World',
      },
      type: 'GLOBAL',
      header: 'I think we can end terrorism by nuclear warhead.',
      description: 'I really believe that nuclear can put an end to every problem. One blow and everything is gone. I think you need to sacrifice some lifes for the better of whole you know.',
      discussions: [
        'Whoa, chill the fuck out man. nuclear cannot solve my money problem duh.',
        'I think the most important problem in the world right now is not terrorism. but the way people choose to solve it.. look at the past 10 years.. the world was trying to solve it but is it better now ?',
      ],
    },
    {
      category: {
        id: '',
        title: 'World',
      },
      type: 'GLOBAL',
      header: 'What is your favorite chemical reaction and why?',
      description: '',
      discussions: [
        'Whoa, chill the fuck out man. nuclear cannot solve my money problem duh.',
        'I think the most important problem in the world right now is not terrorism. but the way people choose to solve it.. look at the past 10 years.. the world was trying to solve it but is it better now ?',
      ],
    },
    {
      category: {
        id: '',
        title: 'Space',
      },
      type: 'GLOBAL',
      header: 'UFO doesn\'t visit us because we are too stupid yo',
      description: '',
      discussions: [
      ],
    },
  ];
  return {
    thoughts: data,
    thoughtsReady: true,
  };
}, PersonalFeed);
