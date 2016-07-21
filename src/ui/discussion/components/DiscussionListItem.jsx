import React from 'react';

import './DiscussionListItem.import.css';

const DiscussionListItem = ({ discussion }) => (
  <div className="dl-i">
    {console.log(discussion)}
    {
      discussion.first_message
    }
  </div>
);

DiscussionListItem.propTypes = {
  discussion: React.PropTypes.object,
};

export default DiscussionListItem;