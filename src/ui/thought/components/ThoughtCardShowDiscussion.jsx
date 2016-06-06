import React from 'react';

const ThoughtCardShowDiscussion = ({ discussions }) => (
  <div className="show-discussion">
    <div className="header">
      <i className="fa fa-comment"></i>
      <label>Some global discussions</label>
    </div>
    {discussions.map(
      (discussion, i) =>
        <div className="wrapper">
          <p key={i} className="merr-font">
            {`" ${discussion} "`}
          </p>
        </div>
    )}
    <div className="see-all">See all discussions</div>
  </div>
);

ThoughtCardShowDiscussion.propTypes = {
  discussions: React.PropTypes.array,
};

export default ThoughtCardShowDiscussion;
