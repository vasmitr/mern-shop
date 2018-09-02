import React from 'react';
import { connect } from 'react-redux';
import Category from './Category';

const categoryList = (props) => {
  return (
    <div className="categoryList">
      {
        props.items
          .map(category => <Category key={ category.id } { ...category }/>)
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  const {items, loading } = state.catalog.categories;
  return { items, loading };
}

export default connect(mapStateToProps)(categoryList);
