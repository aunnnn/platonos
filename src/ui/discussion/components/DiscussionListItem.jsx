import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import './DiscussionListItem.import.css';

const DiscussionListItem = ({ discussion }) => (
  <Link to={`/discussions/${discussion._id}`} style={{ textDecoration: 'none' }}>
    <div className="dl-i">
      <label className="time">{moment(discussion.last_active).fromNow()}</label>
      <p className="merr-font">"{discussion.first_message}"</p>
    </div>
  </Link>
);

DiscussionListItem.propTypes = {
  discussion: React.PropTypes.object,
};

export default DiscussionListItem;
