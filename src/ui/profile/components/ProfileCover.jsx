import React, { Component } from 'react';

export default class ProfileCover extends Component {
  render() {
    const coverSrc = 'img/profile-cover-2.jpg';
    return (
      <div
        className="cover"
        style={{ backgroundImage: `url(${coverSrc})` }}
      >
        <div className="row container">
          <div className="twelve columns">
            <button>
              <i className="fa fa-camera"></i>
              Change cover image
            </button>
          </div>
        </div>
      </div>
    );
  }
}
