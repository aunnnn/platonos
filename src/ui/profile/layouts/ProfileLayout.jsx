import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import ProfileCover from '../components/ProfileCover.jsx';
import './ProfileLayout.import.css';

class ProfileLayout extends Component {

  constructor(props) {
    super(props);
  }

  getDummyUser() {
    return {
      appProfile: {
        picture: Meteor.user().appProfile,
        first_name: 'Jirat',
        last_name: 'Onaree',
        description: 'Yo what\'s up jirat is back in town motherfuckerr.',
        friends_ids: [],
        followed_categories: [
          { id: '', title: 'Politics' },
          { id: '', title: 'Science' },
          { id: '', title: 'Space' },
        ],
        works: ['Student Yo'],
        educations: ['Chulalongkorn University'],
        address: {
          born: {
            city: 'Bangkok',
            country: 'Thailand',
          },
          lives: {
            city: 'California',
            country: 'United States',
          },
        },
      },
    };
  }

  render() {
    const {
      children,
      currentUser
    } = this.props;
    console.log(currentUser);
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
            src={currentUser.appProfile.picture}
          />
          <h1>
            {`${currentUser.appProfile.first_name} ${currentUser.appProfile.last_name}`}
          </h1>
          <h4>Yo what's up jirat is back in town motherfuckerr.</h4>
        </div>

        {
          // children
        }
        {/* children && React.cloneElement(children, { currentUser }) */}

      </div>
    );
  }
}

ProfileLayout.propTypes = {
  categoryName: React.PropTypes.string,
  children: React.PropTypes.element,
};

export default ProfileLayout;
