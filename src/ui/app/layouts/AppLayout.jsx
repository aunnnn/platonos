import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import AddCount from '../components/AddCount.jsx';

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
        <div className="navbar">
          <div className="logo">
            Platonos
          </div>
        </div>
        <div className="child-content">

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
