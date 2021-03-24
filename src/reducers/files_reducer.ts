import {Action} from "../interfaces/interfaces" 
import {
	CHANGE_TYPE,
    UPLOAD_FAILED,
    UPLOAD_SUCCESSFUL,
    ERROR
} from "../actions/action_types"
import { FileInitialState} from "../interfaces/FileTypes"

const file_initial_state:FileInitialState = {
	name: "",
    type: "",
    material: new File([], "sample"),
    status: "",
    error: {message: ""},
    file_id: null
}

export const file_reducer = (state = file_initial_state, action:Action) => {
	switch(action.type) {
		case CHANGE_TYPE: 
			return {
				...state,
				type: action.payload
			}
		case UPLOAD_SUCCESSFUL:
			return {
				...state,
				status: "Success",
                file_id: action.payload
			}
        case UPLOAD_FAILED: 
            return {
                ...state,
                status: "Failed",
                error: action.payload
            }
		
		default: return state
	}
	
}
