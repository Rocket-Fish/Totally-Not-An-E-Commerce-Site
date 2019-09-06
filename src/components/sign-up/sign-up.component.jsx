import React, { useState } from 'react'

import {connect} from 'react-redux'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import {signUpStart} from '../../redux/user/user.actions'
import './sign-up.styles.sass'

const SignUp = ({ signUpStart }) => {
	const blankState = {
		displayName: '',
		email: '',
		password: '',
		confirmPassword: ''
	}
	const [userCredentials, setUserCredentials] = useState(blankState)
	const { displayName, email, password, confirmPassword } = userCredentials
	
	const handleSubmit = async event => {
		event.preventDefault()

		if(password !== confirmPassword) {
			alert(`passwrods don't match`)
			return
		}

		signUpStart(displayName, email, password)

		setUserCredentials(blankState)
	}

	const handleChange = event => {
		const {name, value} = event.target

		setUserCredentials({...userCredentials, [name]: value})
	}

	return (
		<div className='sign-up'>
			<h2 className='title'> I do not have an account</h2>
			<span>Sign up with your email and password</span>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				<FormInput
					type='text'
					name='displayName'
					value={displayName}
					onChange={handleChange}
					label='Display Name'
					required />
				<FormInput
					type='email'
					name='email'
					value={email}
					onChange={handleChange}
					label='Email'
					required />
				<FormInput
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
					label='Password'
					required />
				<FormInput
					type='password'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
					label='Confirm Password'
					required />
				<CustomButton type='submit'>SIGN UP</CustomButton>
			</form>
		</div>
	)
}

const mapDispatchToProps = dispatch => ({
	signUpStart: (displayName, email, password) => dispatch(signUpStart({ displayName, email, password }))
})

export default connect(null, mapDispatchToProps)(SignUp)