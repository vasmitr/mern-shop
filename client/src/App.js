import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { store } from './store';
import { Provider } from 'react-redux';

import { Layout } from './components/appShell';
import { Register } from './components/register';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className="App">
        <BrowserRouter>
          <Switch>
            <Layout>
              <Route path='/' exact component={ Register }></Route>
              <Route path='/register' component={ Register }></Route>
            </Layout>
          </Switch>
        </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
