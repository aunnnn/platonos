import React from 'react';
import { Link } from 'react-router';
import './CategoryButton.import.css';

const CategoryButton = ({ text, toPath }) => (
  <Link
    to={toPath}
    className="category-button"
    activeClassName="link-active"
  >
    <div>{text}</div>
  </Link>
);
CategoryButton.propTypes = {
  text: React.PropTypes.string,
  toPath: React.PropTypes.string,
};

export default CategoryButton;
