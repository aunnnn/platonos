import React, { Component } from 'react';
import { connect } from 'react-redux';

import SidebarList from '../components/SidebarList.jsx';

class FeedLayout extends Component {

  render() {
    return (
      <div className="feed-wrapper container">
        <div className="row">
          <div className="three columns">
            <SidebarList />
          </div>
          <div className="seven columns">
            fffffffffffffffffffffffffffffffffffffffffffffff
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
