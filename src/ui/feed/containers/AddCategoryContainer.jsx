import { createContainer } from 'meteor/react-meteor-data';

import AddCategoryPage from '../layouts/AddCategoryPage.jsx';
import Categories from '../../../api/thought/categories.js';

export default createContainer(() => {
  const allCategories = Categories.methods.getAllCategories();
  const followedCategories = [];
  return {
    allCategories,
    followedCategories,
  };
}, AddCategoryPage);
