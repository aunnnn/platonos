import React from 'react';

// components
import CategoryButton from './CategoryButton.jsx';
import FeedTypeButton from './FeedTypeButton.jsx';
import { Link, withRouter } from 'react-router';
// import { OrbitLoader } from '../../app/components/Loader.jsx';
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
    const {
      router,
    } = this.props;
    
    // dummy data
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
        name: 'Engineering',
      },
    ];
    return (
      <div className="sidebarlist-wrapper">

        <FeedTypeButton
          key="pfeed"
          text="Thoughts"
          toPath="/"
          isIndexLink={true}
          isActive={router.isActive('/', true)}
        />
        <FeedTypeButton
          key="gfeed"
          text="Top Debates"
          toPath="/global"
          isActive={router.isActive('/global', true)}
        />

        <div className="horizontal-divider"></div>
        {
          cats.map(cat => (
            <CategoryButton
              key={cat.id}
              text={cat.name}
              toPath={`/category/${cat.name}`}
              isActive={router.isActive(`/category/${cat.name}`, true)}
            />
          ))
        }
        <Link
          to="/categories"
          className="more-button"
          activeClassName="link-active"
        >
          All Categories..
        </Link>
        {/*
          <div className="horizontal-divider"></div>
          <Link to="/">Discussed</Link>
        */}
      </div>
    );
  }
}

SidebarList.propTypes = {
  router: React.PropTypes.object,
};

export default withRouter(SidebarList);

