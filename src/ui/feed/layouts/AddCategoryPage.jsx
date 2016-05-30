import React from 'react';
import './AddCategoryPage.import.css';
import CategoryCard from '../components/CategoryCard.jsx';

export default class AddCategoryPage extends React.Component {

  render() {
    const {
      allCategories,
    } = this.props;
    return (
      <div>
        <div className="add-category">
          <h4>What are your interests?</h4>
          <h6>Add more categories to connect with various people.</h6>
          <div className="panel">
            {
              allCategories.map(cat => <CategoryCard key={cat.title} title={cat.title} />)
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
