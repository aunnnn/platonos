import React from 'react';
import moment from 'moment';

const ThoughtCardUpperInfo = ({ category, type, currentUser, isOwner, created_at }) => (
  <div className="category">
    <i className="fa fa-lightbulb-o"></i>
    <label>{category}</label>
    {isOwner ?
      <div className="owner">
        <div
          className="owner-pic"
          style={{ backgroundImage: `url(${currentUser.picture})` }}
        ></div>
        <label>{moment(created_at).fromNow()}</label>
      </div>
      : ''
    }
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
  currentUser: React.PropTypes.object,
  isOwner: React.PropTypes.bool,
};

export default ThoughtCardUpperInfo;
