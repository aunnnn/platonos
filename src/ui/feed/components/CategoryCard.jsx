import React from 'react';


export default class CategoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.actionMouseOver = this.actionMouseOver.bind(this);
    this.actionMouseOut = this.actionMouseOut.bind(this);
  }
  actionMouseOver() {
    this.props.actionMouseOver(this.props.categoryData);
  }
  actionMouseOut() {
    this.props.actionMouseOut();
  }
  render() {
    return (
      <div className="card" onMouseOver={this.actionMouseOver} onMouseOut={this.actionMouseOut}>
        {this.props.categoryData.title}
      </div>
    );
  }
}

CategoryCard.propTypes = {
  categoryData: React.PropTypes.object,
  actionMouseOver: React.PropTypes.func,
  actionMouseOut: React.PropTypes.func,
};
