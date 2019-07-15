import React from 'react';
import {Route} from 'react-router-dom'

import './App.sass';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'

function App() {
  return (
    <div>
      <Route exact={true} path='/' component={HomePage} />
      <Route exact={true} path='/shop' component={ShopPage} />
    </div>
  );
}

export default App;
