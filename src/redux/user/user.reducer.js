const INITIAL_STATE = {
	currentUser:null
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
		case 'SET_CURRENT_User':
			return {
				...state, 
				currentUser: action.payload
			} 

		// note that every single action gets passed through every reducer
		// so if no action type is found in this reducer, just return nothing
		default: 
			return state
	}
}

export default userReducer
