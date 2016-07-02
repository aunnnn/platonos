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
      user,
      children,
    } = this.props;
    return (
      <div>
        {/* Navbar & Padding */}
        <NavbarLayout user={user} />
        <div style={{ height: '55px', width: '100%' }}></div>
        {/* Children */}
        <div className="child-content">
          {children}
        </div>
      </div>
    );
  }
  render() {
    const {
      user,
      userReady,
    } = this.props;

    // waiting for user to ready
    if (!userReady) return <OrbitLoader />;

    // user ready
    if (user) return this.renderAuthorized(); // logged in

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
  user: React.PropTypes.object,
  userReady: React.PropTypes.bool,
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object, // current router location
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(withRouter(AppLayout));
