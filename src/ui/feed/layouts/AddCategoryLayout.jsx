import React from 'react';

import CategoryCardSection from '../components/CategoryCardSection.jsx';
import './AddCategoryLayout.import.css';

const AddCategoryLayout = ({ currentUser: { followed_categories } }) => (
  <div>
    <div className="add-category">
      <h4 className="feed-header">All Categories</h4>
      <div className="panel followed">
        <hr />
        <label>Categories you've followed</label>
        {followed_categories.length !== 0 ?
          <CategoryCardSection
            type="followed"
            followedCategories={followed_categories}
          />
          :
          <p>Nothing here yet! Let's follow some more categories below.</p>
        }
      </div>
      <div className="panel all">
        <hr />
        <label>All categories</label>
        <CategoryCardSection type="all" />
      </div>
    </div>
  </div>
);

AddCategoryLayout.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
};

export default AddCategoryLayout;
