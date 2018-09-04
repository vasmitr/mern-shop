import React from 'react'
import { ADD_TO_CART } from '../../actionTypes';
import { action } from '../../store';

export default (props) => {
  const { _id, price } = props;
  return (
    <div className="card itemList__item">
      <h1 className="card__header">{ props.name }</h1>
      <div className="card__image">
        <img src={ props.image } alt={ props.name }/>
      </div>
      <p className="cart__price">{ props.price + '$' }</p>
      <button className="card__button" onClick={ () => action(ADD_TO_CART, { _id, price }) }>To Cart</button>
    </div>
  )
}