import React, { Component, PropTypes } from 'react';

// components
import AboutCard from '../components/AboutCard.jsx';
import FriendsCard from '../components/FriendsCard.jsx';
import ProfileCategoriesNav from '../components/ProfileCategoriesNav.jsx';

// containers
import FeedContainer from '../containers/ProfileIndexFeedContainer.jsx';

export default class ProfileIndexLayout extends Component {
  constructor(props) {
    super(props);
    // this.state = { currentCategory: }
  }
  render() {
    const {
      currentUser,
    } = this.props;
    return (
      <div className="row container">

        <div className="four columns left">
          <AboutCard
            currentUser={currentUser}
          />
          <FriendsCard
            currentUser={currentUser}
          />
        </div>
        <div className="six columns feed">
          <div className="card-header">
            <label>Your Thoughts</label>
          </div>
          <FeedContainer />
        </div>
        <div className="two columns nav">
          <ProfileCategoriesNav categories={currentUser.followed_categories} />
        </div>
      </div>
    );
  }
}

ProfileIndexLayout.propTypes = {
  currentUser: PropTypes.object,
};
