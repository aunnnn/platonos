import React from 'react';

import CardActionStar from './CardActionStar.jsx';
import CardActionShare from './CardActionShare.jsx';

const ThoughtCardActionBar = () => (
  <div className="action-bar">
    <div className="left">
      <CardActionStar isStarred={false} starCount={12} />
      <CardActionShare />
    </div>
    <div className="right">
      <i className="fa fa-chevron-down"></i>
    </div>
  </div>
);

export default ThoughtCardActionBar;
