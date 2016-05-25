import React, { Component } from 'react';
import '../../_tools/clamp.js';
import moment from 'moment';

class AlsoConnectedNoti extends Component {
  componentDidMount() {
    let dom = this.refs.clampText;
    $clamp(dom, { clamp: 2 });
  }
  render() {
    const { noti } = this.props;
    const name = noti.friend.name;
    const pic = noti.friend.pic;
    return (
      <div className="item">
        <img src={pic} className="user-pic" role="presentation" />
        <div className="detail merr-font" ref="clampText">
          <span className="hilight">
            {`${name} `} has also connected you!
          </span>
          {' '} you both are now friend. Congrats!
        </div>
        <div className="date">{moment(noti.date).fromNow()}</div>
      </div>
    );
  }
}

AlsoConnectedNoti.propTypes = {
  noti: React.PropTypes.object,
};

export default AlsoConnectedNoti;
