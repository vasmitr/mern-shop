import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const { _id } = props;
  return (
    <div className="card">
      <Link to={ `/products/${ _id }` }>
        <h1 className="card__header">{ props.name }</h1>
        <img src={ props.image } alt={ props.name } className="card__image"/>
      </Link>
    </div>
  )
}

