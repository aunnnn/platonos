import React from 'react';
import classNames from 'classnames';

import './DiscussionBubble.import.css';

const DiscussionBubble = ({ text, isSelf, inRoom }) => (
  <div
    className={classNames('db merr-font', { self: isSelf }, { inRoom })}
  >
    {text}
  </div>
);

DiscussionBubble.propTypes = {
  text: React.PropTypes.string,
  isSelf: React.PropTypes.bool,
  inRoom: React.PropTypes.bool,
};

export default DiscussionBubble;
