import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  display: flex;
  align-items: center;
  margin-top: auto;
  min-width: 100%;
  background-color: #333;
  color: #fff;
  height: 100px;

  .footer__copyright {
    margin: 2rem;
  }
`

export default () => {
  return (
    <Footer className='footer'>
    <span className='footer__copyright'>&copy; mern-shop 2018</span>
    </Footer>
  )
}
