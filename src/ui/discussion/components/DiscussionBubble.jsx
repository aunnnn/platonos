import React from 'react';
import classNames from 'classnames';

import './DiscussionBubble.import.css';

const DiscussionBubble = ({ text, isSelf }) => (
  <div className={classNames('db merr-font', { self: isSelf })}>
    {text}
  </div>
);

DiscussionBubble.propTypes = {
  text: React.PropTypes.string,
  isSelf: React.PropTypes.bool,
};

export default DiscussionBubble;
