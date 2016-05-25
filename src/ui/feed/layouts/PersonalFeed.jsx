import React from 'react';
import ThoughtCardLayout from '../../thought/layouts/ThoughtCardLayout.jsx';

export default class PersonalFeed extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ThoughtCardLayout />
      </div>
    );
  }
}
