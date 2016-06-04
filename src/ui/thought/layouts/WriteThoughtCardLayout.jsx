import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

// components
import HeaderEditor from '../components/HeaderEditor.jsx';
import DescriptionEditor from '../components/DescriptionEditor.jsx';
import './WriteThoughtCardLayout.import.css';

class WriteThoughtCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasHead: false,
      hasDesc: false,
      isGlobal: false,
    };
    this.toggleDesc = () => this.setState({ hasDesc: !this.state.hasDesc });
    this.setHeadTrue = () => this.setState({ hasHead: true });
    this.setHeadFalse = () => this.setState({ hasHead: false });
    this.toggleGlobal = () => this.setState({ isGlobal: !this.state.isGlobal });
  }
  render() {
    const { hasHead, hasDesc, isGlobal } = this.state;
    return (
      <div className="write-thought-card-layout">
        <UpperRow />
        <div className={classNames('header', { hasDesc })}>
          <HeaderEditor
            setHeadTrue={this.setHeadTrue}
            setHeadFalse={this.setHeadFalse}
            hasHead={hasHead}
          />
        </div>
        <div className={classNames('description merr-font', { hidden: !hasDesc })}>
          <DescriptionEditor />
        </div>
        <hr />
        <LowerRow
          toggleDesc={this.toggleDesc}
          hasDesc={hasDesc}
          hasHead={hasHead}
          isGlobal={isGlobal}
          toggleGlobal={this.toggleGlobal}
        />
      </div>
    );
  }
}

const UpperRow = () => (
  <div className="upper-row">
    <i className="fa fa-lightbulb-o"></i>
    <select id="write-thought-card-category" onChange={e => console.log(e)} defaultValue="">
      <option value="" disabled>Choose category..</option>
      <option value="Science">Science</option>
      <option value="Politics">Politics</option>
      <option value="Engineering">Engineering</option>
    </select>
  </div>
);

const LowerRow = ({ toggleDesc, hasHead, hasDesc, isGlobal, toggleGlobal }) => (
  <div className="lower-row">
    <button
      onClick={toggleDesc}
    >
      {hasDesc ? 'Remove description' : 'Add description'}
    </button>
    <button>Save Draft</button>
    <div className="right">
      <button
        className={classNames('global', { active: isGlobal })}
        onClick={toggleGlobal}
      >
        Global
        <i className="fa fa-globe"></i>
      </button>
      <button className={classNames('launch', { disabled: !hasHead })}>
        <i className="fa fa-paper-plane"></i>
        Launch
      </button>
    </div>
  </div>
);

LowerRow.propTypes = {
  toggleDesc: PropTypes.func.isRequired,
  hasHead: PropTypes.bool.isRequired,
  hasDesc: PropTypes.bool.isRequired,
  isGlobal: PropTypes.bool.isRequired,
  toggleGlobal: PropTypes.func.isRequired,
};

export default WriteThoughtCard;
