import {Action} from "../interfaces/interfaces" 
import {
	CHANGE_TYPE,
    UPLOAD_FAILED,
    UPLOAD_SUCCESSFUL,
    GET_YOUR_FILES
} from "../actions/action_types"
import { FileInitialState} from "../interfaces/FileTypes"

const file_initial_state:FileInitialState = {
	name: "",
    type: "",
    material: new File([], "sample"),
    your_files: [],
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
        case GET_YOUR_FILES: 
            return {
                ...state,
                status: "Success",
                your_files: action.payload
            }
		
		default: return state
	}
	
}
