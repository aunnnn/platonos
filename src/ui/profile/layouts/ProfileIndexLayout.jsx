import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ProfileIndexLayout extends Component {
  render() {
    const {
      children,
    } = this.props;
    return (
      <div>
        Yo
        <Link to="profile/friends">to friends</Link>
        <Link to="profile/about">to friends</Link>
      </div>
    );
  }
}
