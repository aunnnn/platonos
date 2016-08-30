import React, { Component } from 'react';

import DiscussionBubble from '../components/DiscussionBubble.jsx';
import './DiscussionRoomLayout.import.css';

export default class DiscussionRoomLayout extends Component {
  render() {
    const { discussionId } = this.props;
    return (
      <div id="dr-l">
        <div className="header">

        </div>
        <div className="message-wrapper">
          <DiscussionBubble text="Yo wahts upp" inRoom />
        </div>
        <div className="message-editor">
          <textarea name="message" ></textarea>
        </div>
      </div>
    );
  }
}

DiscussionRoomLayout.propTypes = {
  discussionId: React.PropTypes.string,
};
