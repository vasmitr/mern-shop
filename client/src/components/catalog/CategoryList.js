import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from './Category';
import { action } from '../../store';
import { FETCH_CATEGORIES } from '../../actionTypes';

class categoryList extends Component {
  componentDidMount() {
    // Fetch categories
    action(FETCH_CATEGORIES); 
  }

  render() {
    return (
      <div className="itemList">
        {
          this.props.items
            .map(category => <Category key={ category._id } { ...category }/>)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { items, loading } = state.catalog.categories;
  return { items, loading };
}

export default connect(mapStateToProps)(categoryList);
