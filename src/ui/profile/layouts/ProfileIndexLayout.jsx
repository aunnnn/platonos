import React, { Component } from 'react';

// components
import AboutCard from '../components/AboutCard.jsx';
import FriendsCard from '../components/FriendsCard.jsx';
import ProfileCategoriesNav from '../components/ProfileCategoriesNav.jsx';

export default class ProfileIndexLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCategoryFilter: 'all',
    };
    this.changeCategoryFilter = this.changeCategoryFilter.bind(this);
  }

  changeCategoryFilter(categoryTitle) {
    // all = default filter
    this.setState({ currentCategoryFilter: categoryTitle });
  }

  render() {
    const {
      profileUser: {
        _id,
        appProfile: {
          followed_categories,
          works,
          educations,
          places,
          friend_ids,
        },
      },
      isFriend,
      isOwner,
    } = this.props;

    return (
      <div className="row container">
        <div className="four columns left">
          <AboutCard
            followed_categories={followed_categories}
            works={works}
            educations={educations}
            places={places}
            userId={_id}
            isOwner={isOwner}
          />
          <FriendsCard
            friend_ids={friend_ids}
            userId={_id}
            isFriend={isFriend}
            isOwner={isOwner}
          />
        </div>
        <div className="six columns feed">
          <div className="card-header">
            <label>Your Thoughts</label>
          </div>
          <div>
            {`{ currentCategoryFilter: ${this.state.currentCategoryFilter} }`}
          </div>
        </div>
        <div className="two columns nav">
          <ProfileCategoriesNav
            categories={followed_categories}
            currentCategoryFilter={this.state.currentCategoryFilter}
            changeCategoryFilter={this.changeCategoryFilter}
          />
        </div>
      </div>
    );
  }
}

ProfileIndexLayout.propTypes = {
  profileUser: React.PropTypes.object,
  isFriend: React.PropTypes.bool,
  isOwner: React.PropTypes.bool,
};
