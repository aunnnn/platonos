import { Meteor } from 'meteor/meteor';
import { Categories } from '../src/api/thought/categories.js';

Meteor.startup(() => {
  if (Categories.find().count() === 0) {
    const dummyCategoryData = [
      {
        title: 'Philosophy',
        description: 'Things you want to think.',
      },
      {
        title: 'Politics',
        description: 'It is about politics, man.',
      },
      {
        title: 'World',
        description: 'World is us. Save the world.',
      },
      {
        title: 'Productivity',
        description: 'How to thrive, at your best.',
      },
      {
        title: 'Mathematics',
        description: 'Brave, very brave man.',
      },
      {
        title: 'Engineering',
        description: 'engineer motherfucker',
      },
      {
        title: 'Philosophy',
        description: 'Things you want to think.',
      },
      {
        title: 'Politics',
        description: 'It is about politics, man.',
      },
      {
        title: 'World',
        description: 'World is us. Save the world.',
      },
      {
        title: 'Productivity',
        description: 'How to thrive, at your best.',
      },
      {
        title: 'Mathematics',
        description: 'Brave, very brave man.',
      },
      {
        title: 'Engineering',
        description: 'engineer motherfucker',
      },
    ];

    dummyCategoryData.forEach((category) => {
      Categories.insert(category);
    });
  }
});
