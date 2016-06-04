import React from 'react';
import { Link } from 'react-router';

const CategoryButton = ({ text, toPath, isActive }) => (
  <Link
    to={toPath}
    className="category-button"
    activeClassName="link-active"
  >
    {text}
    {isActive ? <i className="fa fa-angle-right"></i> : ''}
  </Link>
);
CategoryButton.propTypes = {
  text: React.PropTypes.string,
  toPath: React.PropTypes.string,
  isActive: React.PropTypes.bool,
};

export default CategoryButton;
