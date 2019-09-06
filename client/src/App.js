import React, {useEffect, lazy, Suspense} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'

import {connect} from 'react-redux'

import {GlobalStyles} from './global.styles'

import { selectCurrentUser } from './redux/user/user.selectors'
import {checkUserSession} from './redux/user/user.actions'

import Header from './components/header/header.component'
import {Spinner} from './components/spinner/spinner.component'

const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))

const App = ({checkUserSession, currentUser}) => {

 useEffect(()=> {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div>
      <GlobalStyles />
      <Header/>
      <Switch>
        <Suspense fallback={Spinner}>
          <Route exact={true} path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact={true} path='/checkout' component={CheckoutPage} />
          <Route exact={true} path='/signin' 
            // if current user exists, then redirect signin to homepage
            render={()=> currentUser ? (<Redirect to='/' />) : <SignInAndSignUpPage />} />
          </Suspense>
      </Switch>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, 
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
