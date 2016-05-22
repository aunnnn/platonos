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
        <h1>Hellooo Are u ready for Platonosss~~~~</h1>
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
