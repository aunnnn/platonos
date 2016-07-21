import React, { Component } from 'react';

import DiscussionFilterMenu from '../components/DiscussionFilterMenu.jsx';
import DiscussionListItem from '../components/DiscussionListItem.jsx';
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
      discussions,
    } = this.props;
    return (
      <div id="dl-l">
        <DiscussionFilterMenu
          discussionFilter={discussionFilter}
          changeDiscussionFilter={this.changeDiscussionFilter}
        />
        {
          discussionReady ?
            discussions.map(discussion => (
              <DiscussionListItem
                discussion={discussion}
                key={discussion._id}
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
  discussions: React.PropTypes.array,
};
