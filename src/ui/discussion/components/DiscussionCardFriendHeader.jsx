import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import './DiscussionCardFriendHeader.import.css';

const DiscussionCardFriendHeader = ({ friend, created_at }) => (
  <div className="dc-fh">
    <Link to="/" className="link">
      <img src={friend.picture} role="presentation" />
      <div className="detail">
        <div className="name">
          {`${friend.first_name} ${friend.last_name}`}
        </div>
        <div className="address">
          <i className="fa fa-map-marker"></i>
          {friend.address.lives === null || friend.address.lives === '' ?
            ` ${friend.address.born}, ${moment(created_at).fromNow()}`
            :
            ` ${friend.address.lives}, ${moment(created_at).fromNow()}`
          }
        </div>
      </div>
    </Link>
  </div>
);

DiscussionCardFriendHeader.propTypes = {
  friend: React.PropTypes.object,
  created_at: React.PropTypes.string,
};

export default DiscussionCardFriendHeader;
