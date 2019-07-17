import React from 'react';
import {Switch, Route} from 'react-router-dom'

import './App.sass'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

import Header from './components/header/header.component'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser:null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      this.setState({currentUser: user})
      createUserProfileDocument(user)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact={true} path='/' component={HomePage} />
          <Route exact={true} path='/shop' component={ShopPage} />
          <Route exact={true} path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
}

export default App;
