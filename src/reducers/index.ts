//To build a reducer we need 2 parts: 
//A switch statement (1) with actions as cases (2). 

//As always, we will need interfaces. 

import {Action, State, Task} from "../interfaces" 

const basic_state = {
	tasks: {
		data: [
			
		]
	},
	fullfilled: {
		data: []
	}
}

export function taskReducer (state = basic_state, action: Action):State { 
	switch (action.type) { //1
		case "ADD_TASK_TO_LIST": //2a
			return {
				...state,
				tasks: {data: [...state.tasks.data, action.payload] }
			}
		case "REMOVE_TASK_FROM_LIST": //2b
			return {
				...state,
				tasks: {data: [...state.tasks.data.filter((task:Task) => task.id !== action.payload.id)]},
			}
		case "CHECK_AS_DONE": //2c
			return {
				...state,
				tasks: {data: [...state.tasks.data.filter((task:Task)=>task.id !== action.payload.id)]},
				fullfilled: {data: [...state.fullfilled.data, action.payload]}
			}
		default:
			return state
	}
}