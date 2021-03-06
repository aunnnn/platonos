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
    Meteor.users.methods.getUserForProfile.call(
      { userId, isFriend },
      (err, user) => {
        if (err) {
          console.log('error get user for profile');
          return;
        }
        this.setState({
          profileUserReady: true,
          profileUser: user,
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

    if (!currentUser) return <div></div>;
    /*
      currentUser's profile
    */
    if (currentUser._id === userId) {
      return (
        <ProfileLayout
          profileUser={currentUser}
          currentUser={currentUser}
          isOwner
          children={children}
        />
      );
    }

    /*
      other's profile
    */
    const isFriend = currentUser.appProfile.friend_ids.indexOf(userId) !== -1;

    console.log(userId !== profileUser._id);
    if (!profileUserReady || userId !== profileUser._id) {
      // profile user - not ready
      this.getUserForProfile(userId, isFriend);
      return <OrbitLoader />;
    }
    console.log(profileUser);
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
