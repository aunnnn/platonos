import React from 'react';

class CategoryFeed extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      categoryName,
    } = this.props;
    return (
      <div>
        <h4>Category Feed: {categoryName}</h4>
      </div>
    );
  }
}

CategoryFeed.propTypes = {
  categoryName: React.PropTypes.string,
};

export default CategoryFeed;
