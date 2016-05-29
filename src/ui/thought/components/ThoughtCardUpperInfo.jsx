import React from 'react';

const ThoughtCardUpperInfo = ({ category, type }) => (
  <div className="category">
    <i className="fa fa-lightbulb-o"></i>
    <label>{category}</label>

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
};

export default ThoughtCardUpperInfo;
