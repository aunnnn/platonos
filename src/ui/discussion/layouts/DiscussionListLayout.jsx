import React, { Component } from 'react';

import DiscussionFilterMenu from '../components/DiscussionFilterMenu.jsx';
import DiscussionListItemGroup from '../components/DiscussionListItemGroup.jsx';
import { OrbitLoader } from '../../app/components/Loader.jsx';
import './DiscussionListLayout.import.css';

export default class DiscussionListLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      discussionFilter: 'ongoing', // ongoing, friend, leaved
      activeGroup: '',
      activeDiscussion: '',
      groupThatHasActiveDiscussion: '',
    };
    this.changeDiscussionFilter = this.changeDiscussionFilter.bind(this);
    this.changeActiveGroup = this.changeActiveGroup.bind(this);
    this.changeActiveDiscussion = this.changeActiveDiscussion.bind(this);
  }

  changeDiscussionFilter(filter) {
    this.setState({ discussionFilter: filter });
  }

  changeActiveGroup(groupId) {
    if (this.state.activeGroup === groupId) {
      this.setState({ activeGroup: '' });
    } else {
      this.setState({ activeGroup: groupId });
    }
  }

  changeActiveDiscussion(discussionId, groupId) {
    this.setState({
      activeDiscussion: discussionId,
      groupThatHasActiveDiscussion: groupId,
    });
  }

  render() {
    const {
      discussionFilter, activeGroup, activeDiscussion,
      groupThatHasActiveDiscussion,
    } = this.state;
    const {
      discussionReady, allDiscussions, currentUser,
    } = this.props;

    return (
      <div id="dl-l">
        <DiscussionFilterMenu
          discussionFilter={discussionFilter}
          changeDiscussionFilter={this.changeDiscussionFilter}
        />
        <div className="list-wrapper">
        {
          discussionReady ?
            allDiscussions.map(discussionGroup => (
              <DiscussionListItemGroup
                discussionGroup={discussionGroup}
                key={discussionGroup.thought._id}
                changeActiveGroup={this.changeActiveGroup}
                changeActiveDiscussion={this.changeActiveDiscussion}
                isActive={activeGroup === discussionGroup.thought._id}
                currentUser={currentUser}
                activeDiscussion={activeDiscussion}
                groupThatHasActiveDiscussion={groupThatHasActiveDiscussion}
              />
            ))
            :
            <OrbitLoader />
        }
        </div>
      </div>
    );
  }
}

DiscussionListLayout.propTypes = {
  currentUser: React.PropTypes.object,
  discussionReady: React.PropTypes.bool,
  allDiscussions: React.PropTypes.array,
};
