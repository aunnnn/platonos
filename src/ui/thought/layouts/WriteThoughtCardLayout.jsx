import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';

// collections
import Thoughts from '../../../api/thought/thoughts.js';

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
      headerText: '',
      descriptionText: '',
      category: '',
    };
    this.toggleDesc = () => this.setState({ hasDesc: !this.state.hasDesc });
    this.setHeadTrue = () => this.setState({ hasHead: true });
    this.setHeadFalse = () => this.setState({ hasHead: false });
    this.toggleGlobal = () => this.setState({ isGlobal: !this.state.isGlobal });
    this.setHeaderText = (text) => this.setState({ headerText: text });
    this.setDescriptionText = (text) => this.setState({ descriptionText: text });
    this.setCategory = (event) => {
      this.setState({ category: event.target.value });
    };

    this.launchThought = this.launchThought.bind(this);
  }

  launchThought() {
    const thought = {
      user_id: Meteor.userId(),
      type: this.state.isGlobal ? 'GLOBAL' : 'NORMAL',
      header: this.state.headerText,
      description: this.state.hasDesc ? this.state.descriptionText : '',
      category: {
        title: this.state.category,
      },
    };

    // reset state
    this.state = {
      hasHead: false,
      hasDesc: false,
      isGlobal: false,
      headerText: '',
      descriptionText: '',
      category: '',
    };
    this.refs.headerEditor.reset();
    this.refs.descriptionEditor.reset();

    Thoughts.methods.insert.call({ thought }, (err, result) => {
      if (err) {
        console.log(err.reason);
      } else {
        console.log(result);
      }
    });
  }

  render() {
    const { hasHead, hasDesc, isGlobal } = this.state;
    const { router } = this.props;
    return (
      <div className="write-thought-card-layout">
        <UpperRow setCategory={this.setCategory} selectedCategory={this.state.category}/>
        <div className={classNames('header', { hasDesc })}>
          <HeaderEditor
            ref="headerEditor"
            setHeadTrue={this.setHeadTrue}
            setHeadFalse={this.setHeadFalse}
            hasHead={hasHead}
            setHeaderText={this.setHeaderText}
          />
        </div>
        <div className={classNames('description merr-font', { hidden: !hasDesc })}>
          <DescriptionEditor
            ref="descriptionEditor"
            setDescriptionText={this.setDescriptionText}
          />
        </div>
        <hr />
        <LowerRow
          toggleDesc={this.toggleDesc}
          hasDesc={hasDesc}
          hasHead={hasHead}
          isGlobal={isGlobal}
          toggleGlobal={this.toggleGlobal}
          launchThought={this.launchThought}
        />
      </div>
    );
  }
}

WriteThoughtCard.propTypes = {
  router: PropTypes.object.isRequired,
};

const UpperRow = ({ setCategory, selectedCategory }) => (
  <div className="upper-row">
    <i className="fa fa-lightbulb-o"></i>
    <select id="write-thought-card-category" onChange={setCategory} value={selectedCategory}>
      <option value="" disabled>Choose category..</option>
      <option value="Science">Science</option>
      <option value="Politics">Politics</option>
      <option value="Engineering">Engineering</option>
    </select>
  </div>
);

const LowerRow = ({ toggleDesc, hasHead, hasDesc, isGlobal, toggleGlobal, launchThought }) => (
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
      <button className={classNames('launch', { disabled: !hasHead })} onClick={launchThought}>
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
  launchThought: PropTypes.func.isRequired,
};

UpperRow.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

export default withRouter(WriteThoughtCard);
