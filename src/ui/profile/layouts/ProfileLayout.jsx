import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import ProfileCover from '../components/ProfileCover.jsx';
import './ProfileLayout.import.css';

class ProfileLayout extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
    } = this.props;
    const user = Meteor.user().services.facebook;
    return (
      <div id="profile-layout">
        <ProfileCover />
        <div className="name">
          <img
            role="presentation"
            src={Meteor.user().appProfile.picture}
          />
          <h1>{`${user.first_name} ${user.last_name}`}</h1>
          <h4>Yo what's up jirat is back in town motherfuckerr.</h4>
        </div>
        {children}
      </div>
    );
  }
}

ProfileLayout.propTypes = {
  categoryName: React.PropTypes.string,
  children: React.PropTypes.element,
};

export default ProfileLayout;
