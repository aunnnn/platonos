import { createContainer } from 'meteor/react-meteor-data';
import AddCategoryPage from '../layouts/AddCategoryPage.jsx';

export default createContainer(() => {
  const dumpCategoryData = [
    {
      title: 'Philosophy',
      description: 'The thing you want to think. Everyone know what it is.',
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
      description: 'How to thrive, best.',
    },
  ];
  return {
    allCategories: dumpCategoryData,
  };
}, AddCategoryPage);
