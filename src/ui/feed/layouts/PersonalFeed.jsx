import React from 'react';
import ThoughtCardContainer from '../../thought/containers/ThoughtCardContainer.jsx';

export default class PersonalFeed extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ThoughtCardContainer />
      </div>
    );
  }
}
