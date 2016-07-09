import React from 'react';
import { Link } from 'react-router';

const CategoryCard = ({ category: { title } }) => (
  <Link to={`/category/${title}`}>
    <div className="card">
      {title}
    </div>
  </Link>
);

CategoryCard.propTypes = {
  category: React.PropTypes.object.isRequired,
};

export default CategoryCard;
