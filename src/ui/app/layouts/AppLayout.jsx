import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import components
import NavbarLayout from './NavbarLayout.jsx';

// Layout
class AppLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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

AppLayout.propTypes = {
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
};

// Redux
const mapStateToProps = (state) => (
  {
    count: state.count,
  }
);

export default connect(mapStateToProps)(AppLayout);
