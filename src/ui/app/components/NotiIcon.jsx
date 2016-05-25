import React from 'react';
import classNames from 'classnames';

const NotiIcon = ({ noti }) => {
  const t = noti.type;
  const iconClass =
    t.substring(0,3) === 'MSG' ?
      'fa-comments'
    : t === 'NEW_GLOBAL_DEBATE' ?
      'fa-globe'
    : t === 'NEW_THOUGHT' ?
      'fa-lightbulb-o'
    : t === 'HIGHLIGHT_THOUGHT' ?
      'fa-star'
    : '';
  return (
    <div className="icon-wrapper">
      <i className={classNames('fa', iconClass)}></i>
    </div>
  );
};

NotiIcon.propTypes = {
  noti: React.PropTypes.object,
};

export default NotiIcon;
