import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';

import FriendsDetailSection from '../components/FriendsDetailSection.jsx';
import './ProfileFriendsLayout.import.css';

export default class ProfileFriendsLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      doneLoadingFriends: false,
      friendsOfUserId: '',
      friends: [],
    };
    this.getAllFriendsData = this.getAllFriendsData.bind(this);
  }

  getAllFriendsData(friend_ids, userId) {
    Meteor.users.methods.getFriendsData.call(
      friend_ids,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        this.setState({
          doneLoadingFriends: true,
          friendsOfUserId: userId,
          friends: result,
        });
      }
    );
  }

  render() {
    const {
      profileUser: {
        _id,
        appProfile: {
          first_name,
          friend_ids,
        },
      },
    } = this.props;

    const { doneLoadingFriends, friends } = this.state;

    if (_id !== this.state.friendsOfUserId) {
      if (doneLoadingFriends) {
        this.setState({
          doneLoadingFriends: false,
        });
      }
      if (!doneLoadingFriends) this.getAllFriendsData(friend_ids, _id);
    }

    return (
      <div className="row container" id="pf-l">
        <Link to={`/profile/${_id}`} className="back-link">
          <h5><i className="fa fa-angle-left"></i> Back to Profile</h5>
        </Link>
        <label>37 Friends</label>
        <p>Your friends’ identity won’t be visible to your profile’s visitor who doesn’t know them.</p>
        <FriendsDetailSection
          friends={friends}
          profile_first_name={first_name}
        />
      </div>
    );
  }
}

ProfileFriendsLayout.propTypes = {
  profileUser: React.PropTypes.object,
};

