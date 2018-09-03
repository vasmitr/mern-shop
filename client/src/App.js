import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './App.css';
import { store } from './store';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setToken from './utils/setToken';

import { Layout } from './components/appShell';
import { Register, Login } from './components/register';
import { LOGIN_SUCCESS } from './actionTypes';
import { CategoryList, ProductList } from './components/catalog';

// Access to BrowserHistory
export const history = createHistory();

// Check for user's token
const token = localStorage.getItem('token');
if (token) {
  // Extract user
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;

  // Check that token not expired yet
  if (decoded.exp > currentTime) {
    // Set Authorization header
    setToken(token);
    // Set Auth data to store
    store.dispatch({ type: LOGIN_SUCCESS, payload: decoded })
  } else {
    localStorage.removeItem('token');
  }

}

class App extends Component {
  render() {
    return (
      <Router history={ history }>
        <Provider store={ store }>
          <div className="App">
            <Switch>
              <Layout path='/' exact={ true } component={ CategoryList }></Layout>
              <Layout path='/products/:category_id?' component={ ProductList }></Layout>
              <Route path='/register' component={ Register }></Route>
              <Route path='/login' component={ Login }></Route>
            </Switch>
          </div>
        </Provider>
      </Router>
      
    );
  }
}

export default App;
