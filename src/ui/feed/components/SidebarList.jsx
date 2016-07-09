import React, { Component } from 'react';
// components
import CategoryButton from './CategoryButton.jsx';
import FeedTypeButton from './FeedTypeButton.jsx';
import { Link, withRouter } from 'react-router';
// import { OrbitLoader } from '../../app/components/Loader.jsx';
// styles
import './SidebarList.import.css';

class SidebarList extends Component {
  render() {
    const {
      categories,
      router,
    } = this.props;
    return (
      <div className="sidebarlist-wrapper">

        <FeedTypeButton
          key="pfeed"
          text="Thoughts"
          toPath="/"
          isIndexLink
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
          categories ?
          categories.map(cat => (
            <CategoryButton
              key={cat._id}
              text={cat.title}
              toPath={`/category/${cat.title}`}
              isActive={router.isActive(`/category/${cat.name}`, true)}
            />
          )) : ''
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
  categories: React.PropTypes.array,
  router: React.PropTypes.object,
};

export default withRouter(SidebarList);

