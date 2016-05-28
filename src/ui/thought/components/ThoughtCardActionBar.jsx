import React from 'react';

import CardActionStar from './CardActionStar.jsx';
import CardActionShare from './CardActionShare.jsx';

const ThoughtCardActionBar = ({ type }) => (
  <div className="action-bar">
    {type === 'GLOBAL' ?
      <div className="left">
        <CardActionStar isStarred={false} starCount={12} />
        <CardActionShare />
      </div>
      : ''
    }
    <div className="right action-button">
      <i className="fa fa-angle-down"></i>
    </div>
  </div>
);

ThoughtCardActionBar.propTypes = {
  type: React.PropTypes.string,
};

export default ThoughtCardActionBar;
