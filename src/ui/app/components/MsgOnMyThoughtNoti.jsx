import React, { Component } from 'react';
import moment from 'moment';
import '../../_tools/clamp.js';

// components
import NotiIcon from './NotiIcon.jsx';

class MsgOnMyThoughtNoti extends Component {
  componentDidMount() {
    let dom = this.refs.clampText;
    $clamp(dom, { clamp: 2 });
  }
  render() {
    const { noti } = this.props;
    const disCount = noti.new_discuss_count;
    const msgCount = noti.new_msg_count;
    return (
      <div className="item">
        <NotiIcon noti={noti} />
        <div className="detail merr-font" ref="clampText">
          <span className="hilight">
            {disCount === 0 ? '' : `${disCount} new discussions`}
            {disCount !== 0 && msgCount !== 0 ? ' & ' : ''}
            {msgCount === 0 ? '' : `${msgCount} new messages `}
          </span>
          on your thought: "{noti.thought}"
        </div>
        <div className="date">{moment(noti.date).fromNow()}</div>
      </div>
    );
  }
}

MsgOnMyThoughtNoti.propTypes = {
  noti: React.PropTypes.object,
};

export default MsgOnMyThoughtNoti;
