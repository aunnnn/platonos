import React, { Component } from 'react';

export default class DiscussionRoomLayout extends Component {
  render() {
    const { discussionId } = this.props;
    return (
      <div>yo{discussionId}</div>
    );
  }
}

DiscussionRoomLayout.propTypes = {
  discussionId: React.PropTypes.string,
};
