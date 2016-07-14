import React from 'react';
import classNames from 'classnames';

const ProfileCategoriesNav = ({ categories, changeCategoryFilter, currentCategoryFilter }) => (
  <div className="cat-nav">
    <label>Show thoughts in</label>
    <div
      className={classNames('nav all',
        { active: currentCategoryFilter === 'all' }
      )}
      onClick={() => {
        changeCategoryFilter('all');
      }}
    >
      All Topic
    </div>
    <hr />
    {categories.map(
      ({ _id, title }) =>
        <div
          className={classNames('nav',
            { active: currentCategoryFilter === title }
          )}
          onClick={() => {
            changeCategoryFilter(title);
          }}
          key={_id}
        >
          {title}
        </div>
    )}
  </div>
);

ProfileCategoriesNav.propTypes = {
  categories: React.PropTypes.array,
  changeCategoryFilter: React.PropTypes.func,
  currentCategoryFilter: React.PropTypes.string,
};

export default ProfileCategoriesNav;
