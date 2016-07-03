import React, { Component } from 'react';

// collections
import { Discussions } from '../../../api/discussion/discussions.js';

// component
import ThoughtCardLayout from './ThoughtCardLayout.jsx';
import DiscussionCardLayout from '../../discussion/layouts/DiscussionCardLayout.jsx';
import { OrbitLoader } from '../../app/components/Loader.jsx';

import './ThoughtPageLayout.import.css';

export default class ThoughtPageLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      doneLoadingDiscussions: false,
      discussion: [],
      discussionCount: 0,
    };
    this.loadDiscussions = this.loadDiscussions.bind(this);
    this.renderDiscussions = this.renderDiscussions.bind(this);
  }

  loadDiscussions(thoughtId, currentUserId) {
    Discussions.methods.getThoughtPageDiscussions.call(
      JSON.stringify({ thoughtId, currentUserId }),
      (err, result) => {
        if (err) {
          return [];
        }
        this.setState({
          doneLoadingDiscussions: true,
          discussions: result,
          discussionCount: result.length,
        });
      });
  }

  renderDiscussions() {
    return this.state.discussions.map(
      discussion => {
        if (discussion.created_by === this.props.currentUser._id) return '';
        return <DiscussionCardLayout discussion={discussion} key={discussion._id} />;
      }
    );
  }

  render() {
    const {
      ready,
      thought,
      currentUser,
    } = this.props;

    const {
      doneLoadingDiscussions,
      discussionCount,
    } = this.state;

    if (!ready) {
      return <OrbitLoader />;
    }

    if (!doneLoadingDiscussions) {
      this.loadDiscussions(thought._id, currentUser._id);
    }

    return (
      <div className="container" id="tpl">
        <div className="row">
          <div className="eight columns">
            {
              // need isPage flag for adjusting style to ThoughtPage
              ready ?
                <div>
                  <ThoughtCardLayout
                    thought={thought}
                    isPage
                    currentUser={currentUser}
                  />
                  <div className="discuss-header">
                    <label>{`${discussionCount} Discussions`}</label>
                    <hr />
                  </div>
                  <div className="discuss-list">
                    <div className="friend">
                      <label></label>
                    </div>
                    <div className="anonymous">
                      {doneLoadingDiscussions ?
                        this.renderDiscussions() : ''
                      }
                    </div>
                  </div>
                </div>
                :
                <OrbitLoader />
            }
          </div>
          <div className="four columns">

          </div>
        </div>
      </div>
    );
  }
}

ThoughtPageLayout.propTypes = {
  ready: React.PropTypes.bool,
  thought: React.PropTypes.object,
  currentUser: React.PropTypes.object.isRequired,
};
