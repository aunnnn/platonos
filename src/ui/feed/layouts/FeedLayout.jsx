import React, { Component } from 'react';
import { connect } from 'react-redux';

import SidebarList from '../components/SidebarList.jsx';

class FeedLayout extends Component {

  render() {
    const {
      children,
    } = this.props;

    return (
      <div className="feed-wrapper container">
        <div className="row">
          <div className="three columns">
            <SidebarList />
          </div>
          <div className="seven columns">
            {children}
          </div>
          <div className="two columns">
            Message from Founders: fffff...
          </div>
        </div>
      </div>
    );
  }

}

export default FeedLayout;

FeedLayout.propTypes = {
  children: React.PropTypes.object,
};
