import React from 'react';
import './CategoryFeed.import.css';

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
        <div className="category-feed-header">
          <h5>{categoryName}</h5>
          <div className="unfollow-button">Unfollow</div>
        </div>
      </div>
    );
  }
}

CategoryFeed.propTypes = {
  categoryName: React.PropTypes.string,
};

export default CategoryFeed;
