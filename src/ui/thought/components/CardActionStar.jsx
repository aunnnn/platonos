import React from 'react';

const CardActionStar = ({ isStarred, starCount }) => (
  <div className="tc-action-button">
    <i
      className={isStarred ? 'fa fa-star' : 'fa fa-star-o'}
    >
    </i>
    <p>
      {starCount}
    </p>
  </div>
);

CardActionStar.propTypes = {
  isStarred: React.PropTypes.bool.isRequired,
  starCount: React.PropTypes.number.isRequired,
};

export default CardActionStar;

