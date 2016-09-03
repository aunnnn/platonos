import React from 'react';
import moment from 'moment';

import './ThoughtCardUpperInfo.import.css';

const ThoughtCardUpperInfo = ({ category, type, userPicture, isOwner, created_at }) => (
  <div className="tc-ui">
    <i className="fa fa-lightbulb-o"></i>
    <label>{category}</label>
    {/*
    {isOwner ?
      <div className="owner">
        <div
          className="owner-pic"
          style={{ backgroundImage: `url(${userPicture})` }}
        ></div>
        <label>{moment(created_at).fromNow()}</label>
      </div>
      : <div className="owner">
        <div
          className="owner-pic"
          style={{ backgroundImage: `url(${currentUser.appProfile.picture})` }}
        ></div>
        <label>{moment(created_at).fromNow()}</label>
      </div>
    }
  */}

    <div className="owner">
      <div
        className="owner-pic"
        style={{ backgroundImage: `url(${userPicture})` }}
      ></div>
      <label>{moment(created_at).fromNow()}</label>
    </div>


    {type === 'GLOBAL' ?
      <div className="type">
        <label>Global</label>
        <i className="fa fa-globe"></i>
      </div>
      : ''
    }
  </div>
);

ThoughtCardUpperInfo.propTypes = {
  category: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  userPicture: React.PropTypes.string.isRequired,
  isOwner: React.PropTypes.bool,
  created_at: React.PropTypes.string,
};

export default ThoughtCardUpperInfo;
