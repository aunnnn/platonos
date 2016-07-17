import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';

import { OrbitLoader } from '../../app/components/Loader.jsx';

export default class FriendsCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      doneLoadingFriends: false,
      friendsOfUserId: '',
      friends: [],
    };
    this.getFriendsData = this.getFriendsData.bind(this);
  }

  getFriendsData() {
    const { userId, friend_ids } = this.props;
    Meteor.users.methods.getFriendsData.call(friend_ids,
      (err, result) => {
        if (err) {
          console.log('yo cannot get friend data in FriendsCard');
          return;
        }
        this.setState({
          doneLoadingFriends: true,
          friendsOfUserId: userId,
          friends: result,
        });
        return;
      }
    );
  }

  render() {
    const { userId, isOwner } = this.props;
    const {
      doneLoadingFriends,
      friendsOfUserId,
      friends,
    } = this.state;

    // if userId is not the owner of these friends
    if (userId !== friendsOfUserId) {
      if (doneLoadingFriends === true) {
        this.setState({ doneLoadingFriends: false });
      }
      this.getFriendsData();
    }

    return (
      <div className="friend-card card">
        <div className="card-header">
          <label>Friends</label>
          <Link to={`/profile/${userId}/friends`} className="header-link">See all</Link>
        </div>
        <div className="content">
          {
            !doneLoadingFriends ?
              <OrbitLoader />
              :
              friends.length === 0 ?
                'no friends'
                :
                friends.map(
                  friend =>
                    <Link to={`/profile/${friend._id}`}>
                      <img
                        className="friend"
                        src={friend.appProfile.picture}
                        role="presentation"
                        key={friend._id}
                      />
                    </Link>
                  )
          }
        </div>
      </div>
    );
  }
}

FriendsCard.propTypes = {
  friend_ids: React.PropTypes.array,
  userId: React.PropTypes.string,
  isOwner: React.PropTypes.bool,
};
