import React from 'react';
import ThoughtCardLayout from '../../thought/layouts/ThoughtCardLayout.jsx';

import './GlobalFeed.import.css';

export default class GlobalFeed extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      thoughts,
      thoughtsReady,
      currentUser,
    } = this.props;
    return (
      <div>
        <div className="global-feed-header">
          <h4 className="feed-header">Top Global Debates</h4>
          <p className="merr-font">
            All top topics around the world are here.
            Anyone can be part of it.. Let's change the world, together.
          </p>
        </div>
        {thoughtsReady ?
            thoughts.map((thought) => (
              <ThoughtCardLayout
                key={thought._id}
                thought={thought}
                currentUser={currentUser}
              />
            ))
            : (<div>Loading...</div>)}
      </div>
    );
  }
}

GlobalFeed.propTypes = {
  thoughts: React.PropTypes.array,
  thoughtsReady: React.PropTypes.bool,
  currentUser: React.PropTypes.object,
};
