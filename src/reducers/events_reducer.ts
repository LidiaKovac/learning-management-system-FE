import {Action} from "../interfaces/interfaces" 
import {IEvent} from "../interfaces/EventTypes"
import {
	ADD_EVENT,
    REMOVE_EVENT,
    SELECT_DATE,
} from "../actions/action_types"

const event_initial_state = {
	selected_date: new Date(),
    your_events: []
}

export const event_reducer = (state = event_initial_state, action:Action) => {
	switch(action.type) {
		case ADD_EVENT: 
			return {
				...state,
				your_events: [...state.your_events, action.payload]
			}
		case REMOVE_EVENT:
			return {
				...state,
                your_events: state.your_events.filter((event)=> event !== action.payload)
			}
        case SELECT_DATE: 
            return {
                ...state,
                selected_date: action.payload
            }
		default: return state
	}
	
}
