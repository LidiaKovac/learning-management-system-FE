import {Action} from "../interfaces/interfaces" 
import { IClass } from "../interfaces/ClassInterfaces"
import {
    GET_ENROLLED,
	GET_CLASS
} from "../actions/action_types"

const class_initial_state = {
	your_classes: [],
	selected_state: {}
}

export const class_reducer = (state = class_initial_state, action:Action) => {
	switch(action.type) {
		case GET_ENROLLED: 
			return {
				...state,
				your_classes: action.payload
			}
		case GET_CLASS: 
			return {
				...state, 
				selected_class: action.payload
			}
		default: return state
	}
	
}
