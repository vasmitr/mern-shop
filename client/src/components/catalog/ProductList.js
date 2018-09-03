import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from './Product';
import { action } from '../../store';
import { FETCH_PRODUCTS } from '../../actionTypes';

class productList extends Component {
  componentDidMount() {
    // Fetch products
    action(FETCH_PRODUCTS, { category_id: this.props.match.params.category_id });
  }
  
  render() {
    return (
      <div className="productList">
        {
          this.props.items
            .map(product => <Product key={ product._id } { ...product }/>)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { items, loading } = state.catalog.products;
  return { items, loading };
}

export default connect(mapStateToProps)(productList);