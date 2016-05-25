import React from 'react';
import { Meteor } from 'meteor/meteor';
import { push } from 'react-router-redux';

import Store from '../../Store.js';

const logout = () => {
  Meteor.logout(err => {
    if (err) {
      console.log(`logout error: ${err.reason}`);
    }
    Store.dispatch(push('/'));
  });
};

const SettingDropdown = () => (
  <div className="nav-dropdown setting">
    <div className="item">Write Thought</div>
    <div className="item">My Drafts</div>
    <div className="item">Saved Thoughts</div>
    <hr />
    <div className="item">What's Platonos?</div>
    <div className="item">Settings</div>
    <div className="item" onClick={logout}>Sign Out</div>
  </div>
);

export default SettingDropdown;
