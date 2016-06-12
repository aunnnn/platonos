import React, { Component } from 'react';
import { Link } from 'react-router';

export default class FriendsCard extends Component {
  render() {
    return (
      <div className="friend-card card">
        <div className="card-header">
          <label>Friends</label>
          <Link to="profile/friends" className="header-link">See all</Link>
        </div>
        <div className="content">
          {/*
            <div className="row">
            <div className="four columns">
              <img className="friend" role="presentation" src="img/janin.jpg" />
            </div>
            <div className="four columns">
              <img className="friend" role="presentation" src="img/janin.jpg" />
            </div>
            <div className="four columns">
              <img className="friend" role="presentation" src="img/janin.jpg" />
            </div>
          </div>
          */}
          <img className="friend" role="presentation" src="img/janin.jpg" />
          <img className="friend" role="presentation" src="img/konpat.jpg" />
          <img className="friend" role="presentation" src="img/napat.jpg" />
          <img className="friend" role="presentation" src="img/janin.jpg" />
          <img className="friend" role="presentation" src="img/user.jpg" />
          <img className="friend" role="presentation" src="img/janin.jpg" />
        </div>
      </div>
    );
  }
}
