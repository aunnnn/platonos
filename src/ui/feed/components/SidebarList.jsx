import React from 'react';

// components

import CategoryButton from './CategoryButton.jsx';
import FeedTypeButton from './FeedTypeButton.jsx';
import { Link } from 'react-router';
// styles
import './SidebarList.import.css';

class SidebarList extends React.Component {

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
      {
        id: 2,
        name: 'Anthrologicalyoocaly',
      },
    ];
    return (
      <div className="sidebarlist-wrapper">

        <FeedTypeButton
          key="pfeed"
          text="Thoughts"
          toPath="/"
          isIndexLink={true}
        />
        <FeedTypeButton
          key="gfeed"
          text="Top Debate"
          toPath="/global"
        />

        <div className="horizontal-divider"></div>
        {
          cats.map(cat => (
            <CategoryButton
              key={cat.id}
              text={cat.name}
              toPath={`/category/${cat.name}`}
            />
          ))
        }
        <Link to="/addCategories" className="more-button">More...</Link>
      </div>
    );
  }
}

export default SidebarList;
