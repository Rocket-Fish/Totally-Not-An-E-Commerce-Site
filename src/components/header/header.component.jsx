import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {auth} from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selectors'

import {ReactComponent as Logo} from '../../assets/crown.svg'

import './header.styles.sass'
import {HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink} from './header.styles'

const Header = ({currentUser, hidden}) => (
	<HeaderContainer> 
		<LogoContainer to='/'>
			<Logo className='logo'></Logo>
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to='/shop'>Shop</OptionLink>
			<OptionLink to='/shop'>Contact</OptionLink>
			{
				currentUser ? 
					<OptionDiv onClick={() => auth.signOut()}>Sign Out</OptionDiv> 
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

export default connect(mapStateToProps)(Header)