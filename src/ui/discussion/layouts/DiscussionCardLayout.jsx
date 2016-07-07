import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import './DiscussionCardLayout.import.css';

// components
import DiscussionBubble from '../components/DiscussionBubble.jsx';
import ThoughtCardActionDiscuss from '../../thought/components/ThoughtCardActionDiscuss.jsx';
import DiscussionCardFriendHeader from '../components/DiscussionCardFriendHeader.jsx';

export default class DiscussionCardLayout extends Component {
  render() {
    const {
      discussion,
      currentUser,
      isFriend,
    } = this.props;

    return (
      <div className="dcl">
        <div className="dcl-content">
          {
            // header
            isFriend ?
              <DiscussionCardFriendHeader
                friend={{
                  picture: 'https://randomuser.me/api/portraits/thumb/women/0.jpg',
                  first_name: 'Bret',
                  last_name: 'Jones',
                  address: {
                    born: '70709-1710 Mellie Roads',
                    lives: '37181 Dominique Cape',
                  },
                  description: 'Consectetur quod voluptatem necessitatibus aut numquam. My name is Bret',
                }}
                created_at={discussion.created_at}
              />
              :
              <div className="time">
                {moment(discussion.created_at).fromNow()}
              </div>
          }
          {
            // bubble 4aqd8JMahSXPnX9Tb
          }
          <Link to="/" className="bubble-link">
            <DiscussionBubble text={discussion.first_message} />
            <div className="see-full">See Full Discussion</div>
          </Link>
        </div>
        {
          // action discuss
        }
        <ThoughtCardActionDiscuss
          isSubDiscussion
          currentUser={currentUser}
        />
      </div>
    );
  }
}

DiscussionCardLayout.propTypes = {
  discussion: React.PropTypes.object,
  currentUser: React.PropTypes.object,
  isFriend: React.PropTypes.bool,
};
