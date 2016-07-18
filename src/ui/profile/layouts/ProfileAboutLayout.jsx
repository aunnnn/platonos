import React, { Component } from 'react';
import { Link } from 'react-router';

import AboutDetailSection from '../components/AboutDetailSection.jsx';
import './ProfileAboutLayout.import.css';

export default class ProfileAboutLayout extends Component {
  render() {
    const {
      profileUser: {
        _id,
        appProfile: {
          first_name,
          followed_categories,
        },
      },
    } = this.props;
    const work = ['Platonos Inc.'];
    const education = {
      highschool: 'Suankularb',
      college: ['Chulalongkorn University'],
    };
    const places = {
      born: 'Nonthaburi, Bangkok',
      lives: ['Bangkok'],
    };

    return (
      <div className="row container" id="pa-l">
        <Link to={`/profile/${_id}`} className="back-link">
          <h5><i className="fa fa-angle-left"></i> Back to Profile</h5>
        </Link>
        <label>About {` ${first_name}`}</label>
        <AboutDetailSection
          topic="Following Categories"
          detail={followed_categories}
        />
        <AboutDetailSection
          topic="Work"
          detail={work}
        />
        <AboutDetailSection
          topic="Education"
          detail={education}
        />
        <AboutDetailSection
          topic="Places"
          detail={places}
        />
      </div>
    );
  }
}

ProfileAboutLayout.propTypes = {
  profileUser: React.PropTypes.object,
};
