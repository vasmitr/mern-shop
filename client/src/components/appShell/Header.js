import React from 'react'
import styled from 'styled-components';

const Header = styled.header`
  max-width: 100%;
  height: 200px;
  background-color: #333;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  font-size: 2rem;

  .header__link {
    margin: 4rem
  }

  .header__firstlink {
    margin-right: auto;
  }
`

const NavLink = styled.a`
  text-decoration: none;
  color: #fff;

  :hover {
    color: red;
  }
`

export default () => {
  return (
    <Header className='header'>
      <NavLink className='header__link header__firstlink' href="#">Home</NavLink>
      <NavLink className='header__link' href="#">About</NavLink>
      <NavLink className='header__link' href="#">Log In</NavLink>
      <NavLink className='header__link' href="#">Sign Up</NavLink>
    </Header>
  )
}
