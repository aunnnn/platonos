import { createContainer } from 'meteor/react-meteor-data';

import AddCategoryPage from '../layouts/AddCategoryPage.jsx';
import { Categories } from '../../../api/thought/categories.js';

export default createContainer(({ currentUser }) => {
  const allCategories = Categories.methods.getAllCategories.call();
  console.log(allCategories);
  const followedCategories = currentUser.followed_categories ? currentUser.followed_categories : [];
  return {
    allCategories,
    followedCategories,
  };
}, AddCategoryPage);
