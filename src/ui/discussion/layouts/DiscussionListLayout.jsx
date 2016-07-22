import React, { Component } from 'react';

import DiscussionFilterMenu from '../components/DiscussionFilterMenu.jsx';
import DiscussionListItemGroup from '../components/DiscussionListItemGroup.jsx';
import { OrbitLoader } from '../../app/components/Loader.jsx';

export default class DiscussionListLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      discussionFilter: 'ongoing', // ongoing, friend, leaved
    };
    this.changeDiscussionFilter = this.changeDiscussionFilter.bind(this);
  }

  changeDiscussionFilter(filter) {
    this.setState({ discussionFilter: filter });
  }

  render() {
    const { discussionFilter } = this.state;
    const {
      discussionReady,
      allDiscussions,
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
