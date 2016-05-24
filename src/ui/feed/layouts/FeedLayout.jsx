import React, { Component } from 'react';

// components
import SidebarList from '../components/SidebarList.jsx';

export default class FeedLayout extends Component {

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

FeedLayout.propTypes = {
  children: React.PropTypes.object,
};
