import { createContainer } from 'meteor/react-meteor-data';
import AddCategoryPage from '../layouts/AddCategoryPage.jsx';

export default createContainer(() => {
  const dumpCategoryData = [
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
  const followed = [
    
  ];
  return {
    allCategories: dumpCategoryData,
    followedCategories: followed,
  };
}, AddCategoryPage);
