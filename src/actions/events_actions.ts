import { Dispatch } from "react"
import {
	LOADING_TRUE,
	LOGIN_FAILED,
	LOGIN_SUCCESSFUL,
	EMAIL_NOT_EXIST,
    WRONG_CRED,

	JOIN_FAILED,
	JOIN_SUCCESSFUL,
	TOKEN_EXP,
    ADD_EVENT,
    LOADING_FALSE
} from "./action_types"
import { get_current_user, login } from "../api calls/login_api"
import { JoinData, LoginData } from "../interfaces/LoginTypes"
import { join } from "../api calls/join_api"
import { Action, IEvent } from "../interfaces/interfaces"
import { create_event } from "../api calls/event_api"



export const add_event_action = (event:IEvent) => async(dispatch:Dispatch<Action>):Promise<void> => {
	dispatch({
		type: LOADING_TRUE
	})
	if (event) {
		const new_event = create_event(event)
        dispatch({type: ADD_EVENT, payload: new_event})
        dispatch({type: LOADING_FALSE})
	} 
}
