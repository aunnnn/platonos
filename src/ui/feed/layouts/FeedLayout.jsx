import React, { Component } from 'react';

// components
import SidebarList from '../components/SidebarList.jsx';
import MsgFromFounders from '../components/MsgFromFounders.jsx';

import './FeedLayout.import.css';

export default class FeedLayout extends Component {
  render() {
    const {
      children,
      currentUser,
    } = this.props;
    console.log(currentUser.appProfile.followed_categories);
    return (
      <div className="container" id="f-l">
        <div className="row">
          <div className="two columns nav">
            <SidebarList
              categories={currentUser.appProfile.followed_categories}
            />
            <p></p>
          </div>
          <div className="seven columns feed">
            { // PersonalFeedContainer, GlobalFeedContainer,
              // CategoryFeedContainer, AddCategoriesPage
              children && React.cloneElement(children, {
                currentUser,
              })
            }
          </div>
          <div className="three columns right">
            <MsgFromFounders
              name={currentUser.first_name}
            />
          </div>
        </div>
      </div>
    );
  }

}

FeedLayout.propTypes = {
  children: React.PropTypes.object,
  currentUser: React.PropTypes.object,
};
