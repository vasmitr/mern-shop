import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const { _id } = props;
  return (
    <div className="card itemList__item">
      <Link to={ `/products/${ _id }` }>
        <div className="card__image">
          <img src={ props.image } alt={ props.name }/>
        </div>
        <h1 className="card__header">{ props.name }</h1>
      </Link>
    </div>
  )
}

