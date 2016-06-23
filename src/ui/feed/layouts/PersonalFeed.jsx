import React from 'react';
import ThoughtCardLayout from '../../thought/layouts/ThoughtCardLayout.jsx';

import WriteThoughtCardLayout from '../../thought/layouts/WriteThoughtCardLayout.jsx';
import { OrbitLoader } from '../../app/components/Loader.jsx';

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
            thoughts.map((thought) => (
              <ThoughtCardLayout key={thought._id} thought={thought} />
            ))
            : (<OrbitLoader />)}
      </div>
    );
  }
}

PersonalFeed.propTypes = {
  thoughts: React.PropTypes.array,
  thoughtsReady: React.PropTypes.bool,
};
