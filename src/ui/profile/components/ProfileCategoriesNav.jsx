import React from 'react';
import classNames from 'classnames';

const ProfileCategoriesNav = ({ categories }) => (
  <div className="cat-nav">
    <label>Show thoughts in</label>
    <div className="nav all">All Topic</div>
    <hr />
    {categories.map(({ id, title }) => <div className="nav">{title}</div>)}
  </div>
);

ProfileCategoriesNav.propTypes = {
  categories: React.PropTypes.array,
};

export default ProfileCategoriesNav;
