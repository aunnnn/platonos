import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import ProfileLayout from '../layouts/ProfileLayout.jsx';
import { OrbitLoader } from '../../app/components/Loader.jsx';

export default class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profileUserReady: false,
      profileUser: {},
    };
    this.getUserForProfile = this.getUserForProfile.bind(this);
  }

  getUserForProfile(userId, isFriend) {
    console.log('yo get user');
    Meteor.users.methods.getUserForProfile.call(
      { userId, isFriend },
      (err, result) => {
        if (err) {
          console.log('error: cannot get user for profile');
          return;
        }
        this.setState({
          profileUserReady: true,
          profileUser: result,
        });
        return;
      }
    );
  }

  render() {
    const {
      params: {
        userId,
      },
      currentUser,
      children,
    } = this.props;
    const {
      profileUserReady,
      profileUser,
    } = this.state;
    console.log(this.state);
    if (!currentUser) return <div></div>;
    /*
      currentUser's profile
    */
    if (currentUser._id === userId) {
      return (
        <ProfileLayout
          profileUser={currentUser}
          currentUser={currentUser}
          children={children}
        />
      );
    }

    /*
      other's profile
    */
    const isFriend = currentUser.appProfile.friend_ids.indexOf(userId) !== -1;

    if (!profileUserReady) {
      // profile user - not ready
      this.getUserForProfile(userId, isFriend);
      return <div></div>;
    }

    // profile user - ready
    return (
      <ProfileLayout
        profileUser={profileUser}
        currentUser={currentUser}
        isFriend={isFriend}
        children={children}
      />
    );
  }
}

ProfileContainer.propTypes = {
  params: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  children: React.PropTypes.element.isRequired,
};
