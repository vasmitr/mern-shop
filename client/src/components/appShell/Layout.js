import React from 'react';
import { Route } from 'react-router-dom';
import Header  from './Header';
import Footer from './Footer';

export default function AppLayout ({component: Component, ...rest}) {
    return (
      <Route { ...rest } render={(matchProps => {
        return (
          <div>
            <Header/>
            <Component { ...matchProps }/>
            <Footer/>
          </div>
        )
      })}>
    </Route>
    )
}
