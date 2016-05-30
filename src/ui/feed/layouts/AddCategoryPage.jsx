import React from 'react';
import './AddCategoryPage.import.css';
import CategoryCard from '../components/CategoryCard.jsx';

export default class AddCategoryPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      shownDescription: 'Add more categories to connect with various people.',
    };
    this.showCategoryDescription = this.showCategoryDescription.bind(this);
    this.defaultDescription = this.defaultDescription.bind(this);
  }
  showCategoryDescription(categoryData) {
    this.setState({ shownDescription: `${categoryData.title}: ${categoryData.description}` });
  }
  defaultDescription() {
    this.setState({ shownDescription: 'Add more categories to connect with various people.' });
  }
  render() {
    const {
      allCategories,
    } = this.props;
    const {
      shownDescription,
    } = this.state;
    return (
      <div>
        <div className="add-category">
          <h4>What are your interests?</h4>
          <h6>
            {shownDescription}
          </h6>
          <div className="panel">
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
    );
  }
}

AddCategoryPage.propTypes = {
  allCategories: React.PropTypes.array,
};
