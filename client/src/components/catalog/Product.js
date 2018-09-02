import React from 'react'

export default (props) => {
  return (
    <div className="card">
      <h1 className="card__header">{ props.name }</h1>
      <img src={ props.image } alt={ props.name } className="card__image"/>
      <button className="card__button">To Cart</button>
    </div>
  )
}