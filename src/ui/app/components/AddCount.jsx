import React from 'react';
import { connect } from 'react-redux';

// actions
import { addCount } from '../actions/addCount.js';

const AddCount = ({ dispatch, count }) => (
  <div>
    <p>the count is {count}</p>
    <button onClick={() => dispatch(addCount())}>Add count +</button>
  </div>
);

AddCount.propTypes = {
  dispatch: React.PropTypes.func,
  count: React.PropTypes.number,
};

export default connect()(AddCount);
