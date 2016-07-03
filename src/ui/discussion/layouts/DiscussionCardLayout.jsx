import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import './DiscussionCardLayout.import.css';

// components
import DiscussionBubble from '../components/DiscussionBubble.jsx';
import ThoughtCardActionDiscuss from '../../thought/components/ThoughtCardActionDiscuss.jsx';

export default class DiscussionCardLayout extends Component {
  render() {
    const {
      discussion,
      currentUser,
    } = this.props;

    return (
      <div className="dcl">
        <div className="dcl-content">
          {
            // header
          }
          <div className="time">
          {moment(discussion.created_at).fromNow()}
          </div>
          {
            // bubble
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
};
