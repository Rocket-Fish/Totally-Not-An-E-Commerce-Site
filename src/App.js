import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'

import {connect} from 'react-redux'

import './App.sass'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import { selectCurrentUser } from './redux/user/user.selectors'
import {checkUserSession} from './redux/user/user.actions'

import Header from './components/header/header.component'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      memes: 'meme value'
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    const {checkUserSession} = this.props
    checkUserSession()
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
          <Route path='/shop' component={ShopPage} />
          <Route exact={true} path='/checkout' component={CheckoutPage} />
          <Route exact={true} path='/signin' 
            // if current user exists, then redirect signin to homepage
            render={()=> this.props.currentUser ? (<Redirect to='/' />) : <SignInAndSignUpPage />} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, 
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
