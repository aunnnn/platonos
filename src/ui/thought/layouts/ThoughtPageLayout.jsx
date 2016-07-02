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
    };
    this.loadDiscussions = this.loadDiscussions.bind(this);
    this.renderDiscussions = this.renderDiscussions.bind(this);
  }

  loadDiscussions() {
    const thoughtId = this.props.thought._id;
    Discussions.methods.getAllDiscussions.call(JSON.stringify({ thoughtId }), (err, result) => {
      if (err) {
        console.log(err.reason);
        return [];
      }
      if (!this.state.doneLoadingDiscussions) {
        this.setState({
          doneLoadingDiscussions: true,
          discussions: result,
        });
      }
    });
  }

  renderDiscussions() {
    return this.state.discussions.map(
      discussion => (
        <DiscussionCardLayout discussion={discussion} key={discussion._id} />
      )
    );
  }

  render() {
    const {
      ready,
      thought,
    } = this.props;
    const {
      doneLoadingDiscussions,
    } = this.state;

    if (!ready) return <OrbitLoader />;

    if (!doneLoadingDiscussions) this.loadDiscussions();

    return (
      <div className="container" id="tpl">
        <div className="row">
          <div className="eight columns">
            {
              // need isPage flag for adjusting style to ThoughtPage
              ready ?
                <div>
                  <ThoughtCardLayout thought={thought} isPage={true} />
                  <label className="discuss-header">14 Discussions</label>
                  {doneLoadingDiscussions ?
                    this.renderDiscussions() : ''}
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
};
