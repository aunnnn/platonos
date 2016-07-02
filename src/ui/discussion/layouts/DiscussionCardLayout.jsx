import React, { Component } from 'react';

export default class DiscussionCardLayout extends Component {
  render() {
    const {
      discussion,
    } = this.props;
    return (
      <div>{discussion.first_message}<hr /></div>
    );
  }
}

DiscussionCardLayout.propTypes = {
  discussion: React.PropTypes.object,
};
