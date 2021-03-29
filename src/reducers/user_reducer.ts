import {Action, initialState} from "../interfaces/interfaces" 
import {
	LOADING_FALSE, 
	LOADING_TRUE, 
	LOGIN_SUCCESSFUL, 
	LOGIN_FAILED, 
	LOGOUT, 
	EMAIL_NOT_EXIST, 
	WRONG_CRED, 
	JOIN_SUCCESSFUL, 
	JOIN_FAILED,
	TOKEN_EXP,
	ERROR
} from "../actions/action_types"

const initial_state:initialState = {
	logged_user: {
		name: '', 
		last_name: '', 
		email: '', 
		role: '', 
		status: ''},
	selected_user: {},
	is_authorized: false,
	loading: false,
	new_user: {},
	error: ""
}

export const user_reducer = (state = initial_state, action:Action) => {
	switch(action.type) {
		case LOADING_TRUE: 
			return {
				...state,
				loading: true
			}
		case LOADING_FALSE: 
			return {
				...state, 
				loading: false
			}
		case LOGIN_SUCCESSFUL: 
			return {
				...state,
				loading: false,
				is_authorized: true,
				logged_user: action.payload,
				error: ""
			}
		case LOGIN_FAILED:
			return {
				...state,
				loading: false,
				is_authorized: false,
				error: "Wrong email or password"
			}
		case LOGOUT: 
			return {
				...state,
				is_authorized: false,
				logged_user: {},
				error: ""
			}
		case EMAIL_NOT_EXIST: 
			return {
				...state,
				is_authorized: false,
				loading: false,
				logged_user: {},
				error: "Email doesn't exist in our database."
			}
		case WRONG_CRED: 
			return {
				...state,
				is_authorized: false,
				loading: false,
				logged_user: {},
				error: "Wrong email or password"
			}
		case JOIN_SUCCESSFUL: 
			return {
				...state,
				is_authorized: true,
				loading: false,
				logged_user: action.payload,
				error: ""
			}
		case JOIN_FAILED: 
			return {
				...state,
				is_authorized: false,
				loading: false,
				logged_user: {},
				error: action.payload
			}
		case TOKEN_EXP: 
			return {
				...state,
				is_authorized: false,
				loading: false,
				logged_user: undefined,
				error: "Session has expired, please login again."
			}
		case ERROR: 
			return {
				...state,
				error: action.payload
			}
		default: return state
	}
	
}
