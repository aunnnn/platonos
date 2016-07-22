import React, { Component } from 'react';
import classNames from 'classnames';

import DiscussionListItem from './DiscussionListItem.jsx';
import './DiscussionListItemGroup.import.css';

export default class DiscussionListItemGroup extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      discussionGroup,
      isActive,
      changeActiveGroup,
      currentUser,
    } = this.props;

    console.log(discussionGroup.thought);
    const isOwner = currentUser._id === discussionGroup.thought.user_id;
    return (
      <div className="dl-ig">
        <div
          className={classNames('group-header', { active: isActive })}
          onClick={() => {
            changeActiveGroup(discussionGroup.thought._id);
          }}
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
        {isActive ?
          discussionGroup.discussions.map(discussion =>
            <DiscussionListItem
              discussion={discussion}
              key={discussion._id}
            />
          )
          :
          ''
        }
      </div>
    );
  }
}

DiscussionListItemGroup.propTypes = {
  discussionGroup: React.PropTypes.object,
  isActive: React.PropTypes.bool,
  changeActiveGroup: React.PropTypes.func,
  currentUser: React.PropTypes.object,
};
