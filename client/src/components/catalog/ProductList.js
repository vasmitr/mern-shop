import React from 'react';
import { connect } from 'react-redux';
import Product from './Product';

const productList = (props) => {
  return (
    <div className="categoryList">
      {
        props.items
          .map(product => <Product key={ product.id } { ...product }/>)
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  const {items, loading } = state.catalog.categories;
  return { items, loading };
}

export default connect(mapStateToProps)(productList);