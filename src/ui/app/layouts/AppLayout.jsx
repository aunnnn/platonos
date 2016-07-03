import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// components
import NavbarLayout from './NavbarLayout.jsx';
import LoginPageLayout from '../../auth/layouts/LoginPageLayout.jsx';
import { OrbitLoader } from '../components/Loader.jsx';

import './AppLayout.import.css';

// Layout
class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.renderAnonymous = this.renderAnonymous.bind(this);
    this.renderAuthorized = this.renderAuthorized.bind(this);
  }
  renderAnonymous() {
    return (
      <LoginPageLayout />
    );
  }
  renderAuthorized() {
    const {
      currentUser,
      children,
    } = this.props;
    return (
      <div>
        {
          // Navbar & Padding
        }
        <NavbarLayout currentUser={currentUser} />
        <div style={{ height: '55px', width: '100%' }}></div>
        {
          // Children
        }
        <div className="child-content">
          {children && React.cloneElement(children, {
            currentUser,
          })}
        </div>
      </div>
    );
  }
  render() {
    const {
      currentUser,
      currentUserReady,
    } = this.props;
    console.log(currentUserReady);
    // waiting for currentUser to ready
    if (!currentUserReady) return <OrbitLoader />;

    // currentUser ready
    if (currentUser) return this.renderAuthorized(); // logged in

    return this.renderAnonymous(); // not logged in
  }
}

// Redux
const mapStateToProps = (state) => (
  {
    count: state.count,
  }
);

AppLayout.propTypes = {
  currentUser: React.PropTypes.object,
  currentUserReady: React.PropTypes.bool,
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object, // current router location
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(withRouter(AppLayout));
