import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import NavbarLayout from './NavbarLayout.jsx';

class AppLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavbarLayout />
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    count: state.count,
  }
);

export default connect(mapStateToProps)(AppLayout);
