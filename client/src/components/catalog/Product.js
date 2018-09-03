import React from 'react'

export default (props) => {
  return (
    <div className="card itemList__item">
      <h1 className="card__header">{ props.name }</h1>
      <div className="card__image">
        <img src={ props.image } alt={ props.name }/>
      </div>
      <button className="card__button">To Cart</button>
    </div>
  )
}