import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
	// stripe wants stuff in cents so gotta multiply eveyrthing by 100
	// $50 => 5000 cents
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_46brmJSEjlcjsPpK0w3j6rDk00apiWUP8X'

	const onToken = token => {
		console.log(token)
		alert('Payment Successful')
	}

	return (
		<StripeCheckout 
			label='Pay Now'
			name='TOTALLY NOT AN E COMMERCE SITE'
			billingAddress
			shippingAddress
			image='https://sendeyo.com/up/d/f3eb2117da'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	)
}

export default StripeCheckoutButton