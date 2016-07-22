import React, { Component } from 'react';

import DiscussionListContainer from '../containers/DiscussionListContainer.jsx';
import './DiscussionHubLayout.import.css';

export default class DiscussionHubLayout extends Component {

  render() {
    const {
      children,
      currentUser,
    } = this.props;
    return (
      <div id="dh-l" className="row container">
        <div className="sidebar">
          <DiscussionListContainer currentUser={currentUser} />
        </div>
        <div className="discussion-room">
          {children ?
            children && React.cloneElement(children, {
              currentUser,
            })
            :
            <div>no room yo</div>
          }
        </div>
      </div>
    );
  }
}

DiscussionHubLayout.propTypes = {
  children: React.PropTypes.element,
  currentUser: React.PropTypes.object,
};
