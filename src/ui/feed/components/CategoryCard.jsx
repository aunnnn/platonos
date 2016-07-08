import React from 'react';


export default class CategoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.actionMouseOver = this.actionMouseOver.bind(this);
    this.actionMouseOut = this.actionMouseOut.bind(this);
  }
  actionMouseOver() {
    this.props.actionMouseOver(this.props.category);
  }
  actionMouseOut() {
    this.props.actionMouseOut();
  }
  render() {
    return (
      <div className="card" onMouseOver={this.actionMouseOver} onMouseOut={this.actionMouseOut}>
        {this.props.category.title}
      </div>
    );
  }
}

CategoryCard.propTypes = {
  category: React.PropTypes.object,
  actionMouseOver: React.PropTypes.func,
  actionMouseOut: React.PropTypes.func,
};
