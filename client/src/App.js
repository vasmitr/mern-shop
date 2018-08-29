import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { store } from './store';
import { Provider } from 'react-redux';

// import { Header, Footer } from './components/appShell';
import { Register } from './components/register';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className="App">
          <BrowserRouter>
            <Route path='/register' component={Register}></Route>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
