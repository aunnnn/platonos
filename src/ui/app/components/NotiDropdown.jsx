import React, { Component } from 'react';

// components
import MsgOnMyThoughtNoti from './MsgOnMyThoughtNoti.jsx';
import MsgOnOthersThoughtNoti from './MsgOnOthersThoughtNoti.jsx';
import MsgFromFriendNoti from './MsgFromFriendNoti.jsx';
import AlsoConnectedNoti from './AlsoConnectedNoti.jsx';
import HighlightGlobalThoughtNoti from './HighlightGlobalThoughtNoti.jsx';
import NewThoughtFromFriendNoti from './NewThoughtFromFriendNoti.jsx';
import NewGlobalDebateNoti from './NewGlobalDebateNoti.jsx';
import NewThoughtNoti from './NewThoughtNoti';

class NotiDropdown extends Component {
  getDummyData() {
    return [
      {
        type: 'MSG_ON_MY_THOUGHT',
        new_discuss_count: 2,
        new_msg_count: 4,
        thought: 'Hey i was thinking about you right now you know.',
        date: new Date(),
      },
      {
        type: 'MSG_ON_OTHER_THOUGHT',
        new_msg_count: 2,
        thought: 'Hey i really hate Trump because his hair.',
        date: new Date(),
      },
      {
        type: 'MSG_FROM_FRIEND',
        friend: {
          name: 'Napat',
          pic: '/img/napat.jpg',
        },
        new_discuss_count: 1,
        new_msg_count: 3,
        date: new Date(),
      },
      {
        type: 'ALSO_CONNECTED',
        friend: {
          name: 'Janin',
          pic: '/img/janin.jpg',
        },
        date: new Date(),
      },
      {
        type: 'HIGHLIGHT_GLOBAL_THOUGHT',
        friend: {
          name: 'Konpat',
          pic: '/img/konpat.jpg',
        },
        person_count: 6,
        thought: 'The world needs the x-men.',
        date: new Date(),
      },
      {
        type: 'NEW_THOUGHT_FROM_FRIEND',
        friend: {
          name: 'Janin',
          pic: 'img/janin.jpg',
        },
        category: 'World Pilitics',
        thought: 'Kin jong un is gay.',
        date: new Date(),
      },
      {
        type: 'NEW_GLOBAL_DEBATE',
        debate_count: 12,
        topics: [
          'World Politics',
          'Religion',
          'War',
        ],
      },
      {
        type: 'NEW_THOUGHT',
        thought_count: 3,
        topics: [
          'World Politics',
          'Religion',
          'War',
        ],
        date: new Date(),
      },
    ];
  }
  render() {
    return (
      <div className="nav-dropdown noti">
        {this.getDummyData().map(noti => {
          switch (noti.type) {
            case 'MSG_ON_MY_THOUGHT':
              return <MsgOnMyThoughtNoti noti={noti} />;
            case 'MSG_ON_OTHER_THOUGHT':
              return <MsgOnOthersThoughtNoti noti={noti} />;
            case 'MSG_FROM_FRIEND':
              return <MsgFromFriendNoti noti={noti} />;
            case 'ALSO_CONNECTED':
              return <AlsoConnectedNoti noti={noti} />;
            case 'HIGHLIGHT_GLOBAL_THOUGHT':
              return <HighlightGlobalThoughtNoti noti={noti} />;
            case 'NEW_THOUGHT_FROM_FRIEND':
              return <NewThoughtFromFriendNoti noti={noti} />;
            case 'NEW_GLOBAL_DEBATE':
              return <NewGlobalDebateNoti noti={noti} />;
            case 'NEW_THOUGHT':
              return <NewThoughtNoti noti={noti} />;
            default:
              return '';
          }
        })}
      </div>
    );
  }
}

export default NotiDropdown;
