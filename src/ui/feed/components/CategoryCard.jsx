import React from 'react';

const CategoryCard = ({ title }) => (
  <div className="card">
    {title}
  </div>
);

CategoryCard.propTypes = {
  title: React.PropTypes.string,
};

export default CategoryCard;

