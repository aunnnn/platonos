import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import Store from '../../Store.js';
import onClickOutside from 'react-onclickoutside';

// actions
import { openDropdown } from '../actions/openDropdown.js';

const logout = () => {
  Meteor.logout(err => {
    if (err) {
      console.log(`logout error: ${err.reason}`);
    }
    Store.dispatch(push('/'));
  });
};

class SettingDropdown extends Component {
  handleClickOutside() {
    this.props.dispatch(openDropdown('setting'));
  }
  render() {
    const {
      dispatch,
    } = this.props;
    return (
      <div className="nav-dropdown setting">
        <Link
          to="/write" className="item"
          onClick={() => dispatch(openDropdown('setting'))}
        >
          Write Thought
        </Link>
        <div className="item">My Drafts</div>
        <div className="item">Saved Thoughts</div>
        <hr />
        <div className="item">What's Platonos?</div>
        <div className="item">Settings</div>
        <div className="item" onClick={logout}>Sign Out</div>
      </div>
    );
  }
}

SettingDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default onClickOutside(SettingDropdown);
