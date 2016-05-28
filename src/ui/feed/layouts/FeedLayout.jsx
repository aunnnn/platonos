import React, { Component } from 'react';

// components
import SidebarList from '../components/SidebarList.jsx';
import MsgFromFounders from '../components/MsgFromFounders.jsx'

import './FeedLayout.import.css';

export default class FeedLayout extends Component {

  render() {
    const {
      children,
    } = this.props;

    return (
      <div className="feed-wrapper container">
        <div className="row">
          <div className="two columns nav">
            <SidebarList />
          </div>
          <div className="seven columns feed">
            {children}
          </div>
          <div className="three columns right">
            <MsgFromFounders />
          </div>
        </div>
      </div>
    );
  }

}

FeedLayout.propTypes = {
  children: React.PropTypes.object,
};
