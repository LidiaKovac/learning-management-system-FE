import {Action} from "../interfaces/interfaces" 
import {
    GET_ENROLLED,
} from "../actions/action_types"

const class_initial_state = {
	your_classes: []
}

export const class_reducer = (state = class_initial_state, action:Action) => {
	switch(action.type) {
		case GET_ENROLLED: 
			return {
				...state,
				your_classes: action.payload
			}
		default: return state
	}
	
}
