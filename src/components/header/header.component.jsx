import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selectors'

import {ReactComponent as Logo} from '../../assets/crown.svg'

import {signOutStart} from '../../redux/user/user.actions'

import './header.styles.sass'
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles'

const Header = ({ currentUser, hidden, signOutStart}) => (
	<HeaderContainer> 
		<LogoContainer to='/'>
			<Logo className='logo'></Logo>
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to='/shop'>Shop</OptionLink>
			<OptionLink to='/shop'>Contact</OptionLink>
			{
				currentUser ? 
					// as={} changes the <Link> tag to <div> 
					<OptionLink as='div' onClick={signOutStart}>Sign Out</OptionLink> 
				: 
					<OptionLink to='/signin'>Sign In</OptionLink>
			}
			<CartIcon/>
		</OptionsContainer>
		{
			hidden? null : <CartDropdown />
		}
	</HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
	currentUser : selectCurrentUser, 
	hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
	signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)