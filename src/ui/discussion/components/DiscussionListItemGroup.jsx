import React from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';

import DiscussionListItem from './DiscussionListItem.jsx';
import './DiscussionListItemGroup.import.css';

const DiscussionListItemGroup = ({ discussionGroup, isActive, changeActiveGroup, changeActiveDiscussion, currentUser, activeDiscussion, router, groupThatHasActiveDiscussion }) => {
  const isOwner = currentUser._id === discussionGroup.thought.user_id;
  const hasActiveDiscussion = groupThatHasActiveDiscussion === discussionGroup.thought._id;

  return (
    <div className="dl-ig">
      <div
        className={classNames('group-header', { active: isActive }, { hasActiveDiscussion })}
        onClick={() => { changeActiveGroup(discussionGroup.thought._id); }}
      >
        <i className="fa fa-lightbulb-o"></i>
        <label>{discussionGroup.thought.category}</label>
        {
          isOwner ? <label className="own">Your thought</label> : ''
        }
        <h5>{discussionGroup.thought.header}</h5>
        {isOwner ?
          <div className="noti">
            <div className="item new-message">3 New messages</div>
            {/*<div className="item new-discussion">1 New discussions</div>*/}
          </div> : ''
        }
      </div>

      {// render discussions
        isActive ?
          discussionGroup.discussions.map(discussion => {
            if (!hasActiveDiscussion) {
              if (activeDiscussion !== discussion._id) {
                if (router.isActive(`/discussions/${discussion._id}`)) {
                  changeActiveDiscussion(discussion._id, discussionGroup.thought._id);
                }
              }
            }
            return (
              <DiscussionListItem
                discussion={discussion}
                key={discussion._id}
              />
            );
          })
          :
          ''
      }
    </div>
  );
};

DiscussionListItemGroup.propTypes = {
  discussionGroup: React.PropTypes.object,
  isActive: React.PropTypes.bool,
  changeActiveGroup: React.PropTypes.func,
  changeActiveDiscussion: React.PropTypes.func,
  currentUser: React.PropTypes.object,
  activeDiscussion: React.PropTypes.string,
  router: React.PropTypes.object,
  groupThatHasActiveDiscussion: React.PropTypes.string,
};

export default withRouter(DiscussionListItemGroup);

