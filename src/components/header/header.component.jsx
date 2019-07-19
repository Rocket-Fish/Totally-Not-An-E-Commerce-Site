import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {auth} from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'

import {ReactComponent as Logo} from '../../assets/crown.svg'

import './header.styles.sass'

const Header = ({currentUser}) => (
	<div className='header'> 
		<Link to='/' className='logo-container'>
			<Logo className='logo'></Logo>
		</Link>
		<div className='options'>
			<Link className='option' to='/shop'>Shop</Link>
			<Link className='option' to='/shop'>Contact</Link>
			{
				currentUser ? 
				<div className='option' onClick={() => auth.signOut()}>Sign Out</div> 
				: 
				<Link className='option' to='/signin'>Sign In</Link>
			}
			<CartIcon/>
		</div>
	</div>
)

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header)