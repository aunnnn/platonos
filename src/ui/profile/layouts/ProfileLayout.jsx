import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import classNames from 'classnames';

import ProfileCover from '../components/ProfileCover.jsx';
import './ProfileLayout.import.css';

class ProfileLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profilePicLoaded: false,
    };
  }

  render() {
    const {
      isFriend,
      children,
      currentUser,
      profileUser,
    } = this.props;
    const {
      profilePicLoaded,
    } = this.state;

    return (
      <div id="p-l">

        {
          // cover
        }
        <ProfileCover />

        {
          // name
        }
        <div className="name">
          <img
            role="presentation"
            className={classNames({ loading: profilePicLoaded })}
            src={profileUser.appProfile.picture}
            onLoad={() => { this.setState({ profilePicLoaded: true }); }}
          />
          <h1>
            {`${profileUser.appProfile.first_name} ${profileUser.appProfile.last_name}`}
          </h1>
          <h4>{profileUser.appProfile.description}</h4>
        </div>

        {
          // children
        }
        {children && React.cloneElement(children, {
          profileUser,
        })}

      </div>
    );
  }
}

ProfileLayout.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  profileUser: React.PropTypes.object.isRequired,
  children: React.PropTypes.element.isRequired,
  isFriend: React.PropTypes.bool,
};

export default ProfileLayout;
