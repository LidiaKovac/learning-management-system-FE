import { Dispatch } from "react"
import {
	LOADING_TRUE,
    ADD_EVENT,
    LOADING_FALSE,
	GET_BY_DATE,
	GET_HW
} from "./action_types"
import { Action, IEvent } from "../interfaces/interfaces"
import { create_event, get_by_date, get_homework, get_scheduled } from "../api calls/event_api"



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
		const events = await get_scheduled()
		
       dispatch({type: ADD_EVENT, payload: events})
        dispatch({type: LOADING_FALSE})
}

export const get_by_date_action = (date:Date) => async(dispatch:Dispatch<Action>):Promise<void> => {
	dispatch({
		type: LOADING_TRUE
	})
		const events = await get_by_date(date)
		
       dispatch({type: GET_BY_DATE, payload: events})
        dispatch({type: LOADING_FALSE})
}

export const get_homework_action = () => async(dispatch:Dispatch<Action>):Promise<void> => {
	dispatch({
		type: LOADING_TRUE
	})
	const homework = await get_homework()

	dispatch({type: GET_HW, payload: homework})
} 
