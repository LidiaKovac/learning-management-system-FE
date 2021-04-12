import { Dispatch } from "react"
import {
	LOADING_TRUE,
    LOADING_FALSE,
    GET_ENROLLED,
	GET_CLASS
} from "./action_types"
import { Action} from "../interfaces/interfaces"
import { enroll, get_created_classes, get_enrolled, get_single_class } from "../api calls/class_api"



export const get_enrolled_action = () => async(dispatch:Dispatch<Action>):Promise<void> => {
	dispatch({
		type: LOADING_TRUE
	})
		const classes = await get_enrolled()
        dispatch({type: GET_ENROLLED, payload: classes})
        dispatch({type: LOADING_FALSE})
}

export const get_owned_action = () => async(dispatch:Dispatch<Action>):Promise<void> => {
	dispatch({
		type: LOADING_TRUE
	})
		const classes = await get_created_classes()
        dispatch({type: GET_ENROLLED, payload: classes})
        dispatch({type: LOADING_FALSE})
}

export const enroll_action = (class_id: number) => async(dispatch:Dispatch<Action>):Promise<void> => {
	dispatch({
		type: LOADING_TRUE
	})
		await enroll(class_id)
		const classes = await get_enrolled()
        dispatch({type: GET_ENROLLED, payload: classes})
        dispatch({type: LOADING_FALSE})
}

export const select_class_action = (class_id:string) => async(dispatch:Dispatch<Action>):Promise<void> => {
	dispatch({
		type: LOADING_TRUE
	})
	const selected = await get_single_class(parseInt(class_id))
	
	dispatch({type: GET_CLASS, payload: selected})
	dispatch({type: LOADING_FALSE})
}

