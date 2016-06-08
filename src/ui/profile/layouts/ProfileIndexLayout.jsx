import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import AboutCard from '../components/AboutCard.jsx';
import FriendsCard from '../components/FriendsCard.jsx';

export default class ProfileIndexLayout extends Component {

  render() {
    const {
      children,
    } = this.props;
    const dummyAbout = {
      categories: ['Politics', 'Science', 'Space'],
      works: ['Student Yo'],
      educations: ['Chulalongkorn University'],
      places: {
        born: {
          city: 'Bangkok',
          country: 'Thailand',
        },
        lives: {
          city: 'California',
          country: 'United States',
        },
      },
    };
    return (
      <div className="row container">

        <div className="four columns">
          <AboutCard
            about={dummyAbout}
          />
          <FriendsCard />
        </div>
        <div className="six columns">
          you
        </div>
        <div className="two columns">
          yo
        </div>
        <Link to="profile/friends">to friends</Link>
        <Link to="profile/about">to friends</Link>
      </div>
    );
  }
}
