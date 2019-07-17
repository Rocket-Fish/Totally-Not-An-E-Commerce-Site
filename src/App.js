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
      currentUser:null, 
      memes: 'meme value'
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // if userAuth is not null (i.e. they are signed in)
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id, 
              ...snapShot.data()
            }
          })
        })
      }
      else {
        this.setState({currentUser:null})
      }
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
