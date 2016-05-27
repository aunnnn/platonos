import React from 'react';

const ThoughtCardUpperInfo = ({ category }) => (
  <div className="category">
    <i className="fa fa-lightbulb-o"></i>
    <p>
      {category}
    </p>
  </div>
);

ThoughtCardUpperInfo.propTypes = {
  category: React.PropTypes.string,
};

export default ThoughtCardUpperInfo;
