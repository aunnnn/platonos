import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// components
import NavbarLayout from './NavbarLayout.jsx';

class AppLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const {
    //   children,
    //   location,
    // } = this.props;

    // const clonedChildren = children && React.cloneElement(children, {
    //   key: location.pathname,
    // });

    return (
      <div>
        <NavbarLayout />

        <div>
          <Link to="/feed">feed</Link>
          <br />
          <Link to="/login">login</Link>
          <br />
          <Link to="/signup">signup</Link>
        </div>
        <div className="child-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    count: state.count,
  }
);

AppLayout.propTypes = {
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
};

export default connect(mapStateToProps)(AppLayout);
