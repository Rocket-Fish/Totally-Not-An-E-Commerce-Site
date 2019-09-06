export const addItemToCart = (cartItems, cartItemToAdd) => {
	const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)

	if(existingCartItem) {
		return cartItems.map(cartItem => 
			cartItem.id === cartItemToAdd.id 
			? { ...cartItem, quantity: cartItem.quantity+1}
			: cartItem
			)
	}
	else {
		return [...cartItems, {...cartItemToAdd, quantity: 1}]
	}
}  

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id)
	if(existingCartItem.quantity === 1) {
		// case only 1 remain, reducing it to 0 = remove the item
		return deleteItemEntryFromCart(cartItems, cartItemToRemove)
	}
	return cartItems.map (
		cartItem => 
		// if the id matches, reduce the quantity by 0, else just return the item without change
		cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
	)
}

const deleteItemEntryFromCart = (cartItems, cartItemToDelete) => {
	return cartItems.filter(cartItem => cartItem.id !== cartItemToDelete.id)
}

export {deleteItemEntryFromCart}