import React from 'react';
import FeedLayout from './FeedLayout.jsx';

export default class PersonalThoughFeed extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FeedLayout>
        <h2>Personal Thought Feed</h2>
      </FeedLayout>
    );
  }
}
