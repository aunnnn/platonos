import React from 'react';
import classNames from 'classnames';

import './DiscussionFilterMenu.import.css';

const DiscussionFilterMenu = ({ changeDiscussionFilter, discussionFilter }) => (
  <div id="df-m">
    <div
      className={classNames('item', { active: discussionFilter === 'ongoing' })}
      onClick={() => { changeDiscussionFilter('ongoing'); }}
    >
      Ongoing
    </div>
    <div
      className={classNames('item', { active: discussionFilter === 'friends' })}
      onClick={() => { changeDiscussionFilter('friends'); }}
    >
      Friends
    </div>
    <div
      className={classNames('item', { active: discussionFilter === 'leaved' })}
      onClick={() => { changeDiscussionFilter('leaved'); }}
    >
      Leaved
    </div>
  </div>
);

DiscussionFilterMenu.propTypes = {
  changeDiscussionFilter: React.PropTypes.func,
  discussionFilter: React.PropTypes.string,
};

export default DiscussionFilterMenu;
