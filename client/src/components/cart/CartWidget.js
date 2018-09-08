import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  margin-right: 2rem;
  color: #fff;
  font-size: 1rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;

  p {
    margin: 0.1rem;
  }

`

const CartWidget = (props) => {
  const { totalPrice, count } = props;

  return (
    <Container className="cartWidget header__link">
      <span>Your Cart</span>
        <p>Total: { totalPrice }</p>
        <p>Positions { count }</p>
        <button>To Cart</button>
    </Container>
  )
}

export default connect(({cart}) => cart)(CartWidget);
