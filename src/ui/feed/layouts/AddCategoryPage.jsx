import React, { Component } from 'react';
import './AddCategoryPage.import.css';
import CategoryCard from '../components/CategoryCard.jsx';

export default class AddCategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shownDescription: 'What are you interested in.',
    };
    this.showCategoryDescription = this.showCategoryDescription.bind(this);
    this.defaultDescription = this.defaultDescription.bind(this);
  }
  showCategoryDescription(categoryData) {
    this.setState({ shownDescription: `${categoryData.title}: ${categoryData.description}` });
  }
  defaultDescription() {
    this.setState({ shownDescription: 'What are you interested in.' });
  }
  render() {
    const {
      allCategories,
      followedCategories,
    } = this.props;
    const {
      shownDescription,
    } = this.state;
    return (
      <div>
        <div className="add-category">
          <h4 className="feed-header">All Categories</h4>
          <div className="panel followed">
            <hr />
            <label>Categories you've followed</label>
            <div>
              {followedCategories.length !== 0 ?
                followedCategories.map(cat =>
                  <CategoryCard
                    key={cat.title}
                    categoryData={cat}
                    actionMouseOver={this.showCategoryDescription}
                    actionMouseOut={this.defaultDescription}
                  />
                )
                : <p>Nothing here yet! Let's follow some more categories below.</p>
              }
            </div>
          </div>
          <div className="panel all">
            <hr />
            <label>All categories</label>
            <h6>
              {shownDescription}
            </h6>
            <div>
              {
                allCategories.map(cat =>
                  <CategoryCard
                    key={cat.title}
                    categoryData={cat}
                    actionMouseOver={this.showCategoryDescription}
                    actionMouseOut={this.defaultDescription}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddCategoryPage.propTypes = {
  allCategories: React.PropTypes.array,
  followedCategories: React.PropTypes.array,
};
