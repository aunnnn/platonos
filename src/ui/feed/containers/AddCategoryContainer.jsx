import { createContainer } from 'meteor/react-meteor-data';

import AddCategoryPage from '../layouts/AddCategoryPage.jsx';
import { Categories } from '../../../api/category/categories.js';

export default createContainer(({ currentUser }) => {
  const allCategories = Categories.methods.getAllCategories.call((err, result) => {
    console.log(result);
  });
  const followedCategories = currentUser.followed_categories ? currentUser.followed_categories : [];
  return {
    allCategories,
    followedCategories,
  };
}, AddCategoryPage);
