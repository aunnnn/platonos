import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';

import { OrbitLoader } from '../../app/components/Loader.jsx';

export default class FriendsCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      doneLoadingFriends: false,
      friends: [],
    };
  }

  componentDidMount() {
    const { friend_ids } = this.props;
    Meteor.users.methods.getFriendData.call(friend_ids,
      (err, result) => {
        if (err) {
          console.log('yo cannot get friend data in FriendsCard');
          return;
        }
        this.setState({
          doneLoadingFriends: true,
          friends: result,
        });
        return;
      }
    );
  }

  render() {
    const {
      doneLoadingFriends,
      friends,
    } = this.state;
    console.log(friends);
    return (
      <div className="friend-card card">
        <div className="card-header">
          <label>Friends</label>
          <Link to="/profile/friends" className="header-link">See all</Link>
        </div>
        <div className="content">
          {
            !doneLoadingFriends ?
              <OrbitLoader />
              :
              friends.length === 0 ?
                'no friends'
                :
                friends.map(friend => <div>{friend._id}</div>)
          }
        </div>
      </div>
    );
  }
}

FriendsCard.propTypes = {
  friend_ids: React.PropTypes.array,
};
