import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'

import {connect} from 'react-redux'

import './App.sass'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { selectCurrentUser } from './redux/user/user.selectors'

import Header from './components/header/header.component'
import {setCurrentUser} from './redux/user/user.actions'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      memes: 'meme value'
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // if userAuth is not null (i.e. they are signed in)
      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id, 
            ...snapShot.data()
          })
        })
      }
      else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact={true} path='/' component={HomePage} />
          <Route exact={true} path='/shop' component={ShopPage} />
          <Route exact={true} path='/signin' 
            // if current user exists, then redirect signin to homepage
            render={()=> this.props.currentUser ? (<Redirect to='/' />) : <SignInAndSignUpPage />} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
