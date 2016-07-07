import React, { Component } from 'react';

// collections
import { Discussions } from '../../../api/discussion/discussions.js';

// component
import ThoughtCardLayout from './ThoughtCardLayout.jsx';
import DiscussionCardLayout from '../../discussion/layouts/DiscussionCardLayout.jsx';
import FlowingThoughts from '../components/FlowingThoughts.jsx';
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
        return (
          <DiscussionCardLayout
            discussion={discussion}
            key={discussion._id}
            currentUser={this.props.currentUser}
          />
        );
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
                      <label className="count-label">3 Friend discussions</label>
                      <DiscussionCardLayout
                        discussion={{
                          _id: 'pLCW2MCJw5Nc7kFX9',
                          thought: {
                            _id: 'GWiSJpmk7QvE9M2nT',
                            user_id: '4aqd8JMahSXPnX9Tb',
                            header: 'Est alias esse.',
                            description: 'Molestiae maxime voluptas aut. Est quaerat aut saepe quis voluptatem minima. Enim eum molestiae voluptas ratione quo at.',
                            category: 'Philosophy',
                          },
                          created_by: 'MCAxRn7cZ3FXEkM47',
                          first_message: 'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed.',
                          latest_message: 'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed.',
                          created_at: '2016-07-06T12:50:48.781Z',
                        }}
                        key="ksdjfhjksdlfjksaldfjkasdlfjas"
                        currentUser={this.props.currentUser}
                        isFriend
                      />
                    </div>
                    <div className="anonymous">
                      <label className="count-label">6 Anonymous discussions</label>
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
            <FlowingThoughts />
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
