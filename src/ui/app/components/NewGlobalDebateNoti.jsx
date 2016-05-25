import React, { Component } from 'react';
import moment from 'moment';
import '../../_tools/clamp.js';

import NotiIcon from './NotiIcon.jsx';

class NewGlobalDebateNoti extends Component {
  componentDidMount() {
    let dom = this.refs.clampText;
    $clamp(dom, { clamp: 2 });
  }
  render() {
    const { noti } = this.props;
    const debCount = noti.debate_count;
    const topics = noti.topics; // array
    return (
      <div className="item">
        <NotiIcon noti={noti} />
        <div className="detail merr-font" ref="clampText">
          <span className="hilight">
            {`${debCount} new Global Debates `}
          </span>
          about
          {topics.map((topic, i) => {
            if (i === topics.length - 1) return ` and ${topic}`;
            return ` ${topic},`;
          })}
        </div>
        <div className="date">{moment(noti.date).fromNow()}</div>
      </div>
    );
  }
}

NewGlobalDebateNoti.propTypes = {
  noti: React.PropTypes.object,
};

export default NewGlobalDebateNoti;
