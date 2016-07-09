import React, { Component } from 'react';

import CategoryCard from './CategoryCard.jsx';
import { Categories } from '../../../api/category/categories.js';

export class CategoryCardSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isQueried: false,
      categories: [],
    };
    this.queryAllCategories = this.queryAllCategories.bind(this);
  }
  queryAllCategories() {
    Categories.methods.getAllCategories.call(
      (err, result) => {
        if (err) {
          console.log('error');
          return;
        }
        this.setState({
          isQueried: true,
          categories: result,
        });
      }
    );
  }
  render() {
    const { type } = this.props;

    if (type === 'all') {
      if (!this.state.isQueried) this.queryAllCategories();
      return (
        <div>
          {this.state.categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
            />
          ))}
        </div>
      );
    }

    if (type === 'followed') {
      return (
        <div>
          {this.props.followedCategories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
            />
          ))}
        </div>
      );
    }

    return (
      <div></div>
    );
  }
}

CategoryCardSection.propTypes = {
  type: React.PropTypes.string.isRequired,
  followedCategories: React.PropTypes.array,
};

export default CategoryCardSection;
