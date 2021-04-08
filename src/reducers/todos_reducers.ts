import {Action} from "../interfaces/interfaces" 
import {
    ADD_TODO, GET_TODO
} from "../actions/action_types"

const initial_state = {
	tasks: []
}

export const task_reducer = (state = initial_state, action:Action) => {
	switch(action.type) {
		case ADD_TODO: 
			return {
				...state,
				tasks: action.payload
			}
		case GET_TODO: 
			return {
				...state,
				tasks: action.payload
			}
		
		default: return state
	}
	
}
