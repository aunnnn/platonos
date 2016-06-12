import React from 'react';
import ThoughtCardLayout from '../../thought/layouts/ThoughtCardLayout.jsx';
import ThoughtCardContainer from '../../thought/containers/ThoughtCardContainer.jsx';
import WriteThoughtCardLayout from '../../thought/layouts/WriteThoughtCardLayout.jsx';

export default class PersonalFeed extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    const {
      thoughts,
      thoughtsReady,
    } = this.props;
    return (
      <div>
        <WriteThoughtCardLayout />
        {thoughtsReady ?
            thoughts.map(thought => <ThoughtCardLayout thought={thought} />)
            : (<div>Loading...</div>)}
        {/* this.getDummyData().map(thought => <ThoughtCardLayout thought={thought} />) */}
        {/* <ThoughtCardContainer /> */}
      </div>
    );
  }
}

PersonalFeed.propTypes = {
  thoughts: React.PropTypes.array,
  thoughtsReady: React.PropTypes.bool,
};
