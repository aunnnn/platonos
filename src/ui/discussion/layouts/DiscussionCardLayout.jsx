import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import './DiscussionCardLayout.import.css';

import DiscussionBubble from '../components/DiscussionBubble.jsx';

export default class DiscussionCardLayout extends Component {
  render() {
    const {
      discussion,
    } = this.props;

    return (
      <div className="dcl">
        <div className="time">
          {moment(discussion.created_at).fromNow()}
        </div>
        <Link to="/" className="bubble-link">
          <DiscussionBubble text={discussion.first_message} />
          <div className="see-full">See Full Discussion</div>
        </Link>
      </div>
    );
  }
}

DiscussionCardLayout.propTypes = {
  discussion: React.PropTypes.object,
};
