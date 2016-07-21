import React, { Component } from 'react';

import DiscussionListItem from './DiscussionListItem.jsx';
import './DiscussionListItemGroup.import.css';

export default class DiscussionListItemGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDiscussions: false,
    };
    this.toggleShowDiscussions = this.toggleShowDiscussions.bind(this);
  }

  toggleShowDiscussions() {
    this.setState({ showDiscussions: !this.state.showDiscussions });
  }

  render() {
    const { discussionGroup } = this.props;
    const { showDiscussions } = this.state;
    return (
      <div className="dl-ig">
        <div className="group-header" onClick={this.toggleShowDiscussions}>
          <h5>{discussionGroup.thought.header}</h5>
        </div>
        {showDiscussions ?
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
};
