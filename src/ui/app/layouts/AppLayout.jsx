import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import AddCount from '../components/AddCount.jsx';
import NavbarLayout from 'ui/navbar/layouts/NavbarLayout.jsx';

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <NavbarLayout />
        <div className="navbar">
          <div className="logo">
            Platonos
          </div>
        </div>
        <div className="content">
        </div>
        <AddCount count={this.props.count} />
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
