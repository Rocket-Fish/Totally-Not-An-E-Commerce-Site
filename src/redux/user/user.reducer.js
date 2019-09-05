import UserActionTypes from './user.types'
const INITIAL_STATE = {
	currentUser:null, 
	error: null
}

/*
action is literally an object in the following format as specified in user.actions.js
{
	type: 
	payload: 
}
*/
const userReducer = (state = INITIAL_STATE, action) =>  {
	switch (action.type) {
		case UserActionTypes.SIGN_IN_SUCCESS:
			return {
				...state, 
				currentUser: action.payload, 
				error: null
			} 
		case UserActionTypes.SIGN_OUT_SUCESS:
			return {
				...state,
				currentUser: null,
				error: null
			}
		case UserActionTypes.SIGN_IN_FAILURE:
		case UserActionTypes.SIGN_OUT_FAILURE:
			return {
				...state, 
				error: action.payload
			}

		// note that every single action gets passed through every reducer
		// so if no action type is found in this reducer, just return nothing
		default: 
			return state
	}
}

export default userReducer
