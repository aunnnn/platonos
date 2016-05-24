import React from 'react';

// components

import CategoryButton from './CategoryButton.jsx';
import FeedTypeButton from './FeedTypeButton.jsx';
// styles
import './SidebarList.import.css';

class SidebarList extends React.Component {

  constructor(props) {
    super(props);
  }
  sidebarOptionClicked(catname) {
    console.log(catname);
    // this.setState({
    //   activeSidebarOption:
    // });
  }
  render() {
    const cats = [
      {
        id: 0,
        name: 'Philosophy',
      },
      {
        id: 1,
        name: 'Politics',
      },
    ];
    return (
      <div className="sidebarlist-wrapper">

        <FeedTypeButton
          key="pfeed"
          text="Thoughts"
          toPath=""
          isIndexLink={true}
        />
        <FeedTypeButton
          key="gfeed"
          text="Global Debate"
          toPath="global"
        />

        <div className="horizontal-divider"></div>
        {
          cats.map(cat => (
            <CategoryButton
              key={cat.id}
              text={cat.name}
              toPath="category"
            />
          ))
        }
        <a href="/">more...</a>
      </div>
    );
  }
}

export default SidebarList;
