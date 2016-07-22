import React, { Component } from 'react';

import DiscussionFilterMenu from '../components/DiscussionFilterMenu.jsx';
import DiscussionListItemGroup from '../components/DiscussionListItemGroup.jsx';
import { OrbitLoader } from '../../app/components/Loader.jsx';

export default class DiscussionListLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      discussionFilter: 'ongoing', // ongoing, friend, leaved
      activeGroup: '',
    };
    this.changeDiscussionFilter = this.changeDiscussionFilter.bind(this);
    this.changeActiveGroup = this.changeActiveGroup.bind(this);
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

  render() {
    const { discussionFilter, activeGroup } = this.state;
    const {
      discussionReady,
      allDiscussions,
      currentUser,
    } = this.props;

    return (
      <div id="dl-l">
        <DiscussionFilterMenu
          discussionFilter={discussionFilter}
          changeDiscussionFilter={this.changeDiscussionFilter}
        />
        {
          discussionReady ?
            allDiscussions.map(discussionGroup => (
              <DiscussionListItemGroup
                discussionGroup={discussionGroup}
                key={discussionGroup.thought._id}
                changeActiveGroup={this.changeActiveGroup}
                isActive={activeGroup === discussionGroup.thought._id}
                currentUser={currentUser}
              />
            ))
            :
            <OrbitLoader />
        }
        {discussionFilter}
      </div>
    );
  }
}

DiscussionListLayout.propTypes = {
  currentUser: React.PropTypes.object,
  discussionReady: React.PropTypes.bool,
  allDiscussions: React.PropTypes.array,
};
