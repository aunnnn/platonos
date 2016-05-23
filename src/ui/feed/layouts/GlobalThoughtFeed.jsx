import React from 'react';
import FeedLayout from './FeedLayout.jsx';

export default class GlobalThoughtFeed extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FeedLayout>
        <h4>Global Thought Feed</h4>
      </FeedLayout>
    );
  }
}
