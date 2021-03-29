import { Dispatch } from "react"
import {
	LOADING_TRUE,
    ADD_EVENT,
    LOADING_FALSE
} from "./action_types"
import { Action, IEvent } from "../interfaces/interfaces"
import { create_event, get_scheduled } from "../api calls/event_api"



export const add_event_action = (event:IEvent | object) => async(dispatch:Dispatch<Action>):Promise<void> => {
	dispatch({
		type: LOADING_TRUE
	})
	if (event) {
		const new_event = await create_event(event)
        dispatch({type: ADD_EVENT, payload: new_event})
        dispatch({type: LOADING_FALSE})
	} 
	dispatch({type: LOADING_FALSE})
}

export const get_scheduled_action = () => async(dispatch:Dispatch<Action>):Promise<void> => {
	dispatch({
		type: LOADING_TRUE
	})
		const events = get_scheduled()
       // dispatch({type: ADD_EVENT, payload: events})
        dispatch({type: LOADING_FALSE})
}


