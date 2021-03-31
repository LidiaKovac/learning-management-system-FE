import { Dispatch } from "react"
import {
	LOADING_TRUE,
    LOADING_FALSE,
    GET_ENROLLED
} from "./action_types"
import { Action} from "../interfaces/interfaces"
import { enroll, get_enrolled } from "../api calls/class_api"



export const get_enrolled_action = () => async(dispatch:Dispatch<Action>):Promise<void> => {
	dispatch({
		type: LOADING_TRUE
	})
		const classes = await get_enrolled()
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