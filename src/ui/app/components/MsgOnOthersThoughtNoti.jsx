import React, { Component } from 'react';
import moment from 'moment';
import '../../_tools/clamp.js';

// components
import NotiIcon from './NotiIcon.jsx';

class MsgOnOthersThoughtNoti extends Component {
  componentDidMount() {
    let dom = this.refs.clampText;
    $clamp(dom, { clamp: 2 });
  }
  render() {
    const { noti } = this.props;
    const msgCount = noti.new_msg_count;
    return (
      <div className="item">
        <NotiIcon noti={noti} />
        <div className="detail merr-font" ref="clampText">
          <span className="hilight">
            {`${msgCount} `} new messages
          </span>
          {' '} on discussion: "{noti.thought}"
        </div>
        <div className="date">{moment(noti.date).fromNow()}</div>
      </div>
    );
  }
}

MsgOnOthersThoughtNoti.propTypes = {
  noti: React.PropTypes.object,
};

export default MsgOnOthersThoughtNoti;
