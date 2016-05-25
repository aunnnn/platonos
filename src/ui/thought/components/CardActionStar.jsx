import React from 'react';
import './CardAction.import.css';

const CardActionStar = ({ isStarred, starCount }) => (
  <div className="card-action-button-text">
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

