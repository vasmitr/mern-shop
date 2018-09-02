import React from 'react'
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { action } from '../../store';
import { LOGOUT } from '../../actionTypes';

const Header = styled.header`
  max-width: 100%;
  background-color: #fff;
  display: flex;
  flex-flow: column;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;


  @media screen and (min-width: 50rem) {
    & {
      flex-flow: row wrap;
      height: 100px;
      background-color: #333;
    }

    .header__firstlink {
      margin-right: auto;
    }
  }
`

const NavLink = styled.a`
  height: 4rem;
  border: solid 1px #ccc;
  width: 100%;
  color: #333;
  text-align: center;
  text-decoration: none;
  line-height: 4rem;

  @media screen and (min-width: 50rem) {
    & {
      transition: 0.5s ease;
      margin: 3rem;
      width: auto;
      color: #fff;
      border: none;
      text-align: left;
    }

    :hover {
      color: var(--blue);
      transform: translateY(-10px);
    }
}
`

const renderNavlinks = (isAuthorized, name) => {
  return isAuthorized ? (
        <div className="header__authlinks">
          <NavLink className='header__link' href='#' onClick={ (event) => compose(event.preventDefault(), action(LOGOUT)) }><span>Hello, { name }</span> (Log Out)</NavLink>
        </div>
      ) : (
        <div className="header__authlinks">
          <NavLink className='header__link' href='/login'>Log In</NavLink>
          <NavLink className='header__link' href='/register'>Sign Up</NavLink>
        </div>
      )
} 
const HeaderCmp = (props) => {
  const { isAuthorized, name } = props; 
  return (
    <Header className='header'>
      <NavLink className='header__link header__firstlink' href="/">Home</NavLink>
      <NavLink className='header__link' href="/about">About</NavLink>
      { renderNavlinks(isAuthorized, name) }
    </Header>
  )
}

const mapStateToProps = (state) => {
  const { isAuthorized, user } = state.auth;
  return { isAuthorized, name: user.name };
}

export default connect(mapStateToProps)(HeaderCmp)
