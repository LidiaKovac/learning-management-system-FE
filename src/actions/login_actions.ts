import { Dispatch } from "react"
import {
	LOADING_TRUE,
	LOGIN_FAILED,
	LOGIN_SUCCESSFUL,
	EMAIL_NOT_EXIST,
    WRONG_CRED,

	JOIN_FAILED,
	EMAIL_IN_USE,
	JOIN_SUCCESSFUL,
	LOADING_FALSE,
	TOKEN_EXP
} from "./action_types"
import { get_current_user, login } from "../api calls/login_api"
import { JoinData, LoginData } from "../interfaces/LoginTypes"
import { join } from "../api calls/join_api"
import { Action } from "../interfaces/interfaces"

export const login_action = (credentials: LoginData) => async (
	dispatch: Dispatch<Action>
): Promise<void> => {
	dispatch({
		type: LOADING_TRUE,
	})
	if (credentials) {
		const login_attempt = await login(credentials)
		if (login_attempt.message === "Logged in") {
			const current_user = await get_current_user()
			dispatch({
				type: LOGIN_SUCCESSFUL,
				payload: current_user,
			})
		} else if (
			login_attempt.message === "Email doesn't exist in our database"
		) {
			dispatch({
				type: EMAIL_NOT_EXIST,
			})
		} else if (login_attempt.message === "Wrong email or password") {
            dispatch({
                type: WRONG_CRED
            })
        }
	} else
		dispatch({
			type: LOGIN_FAILED,
		})
}

export const join_action = (credentials:JoinData) => async(dispatch:Dispatch<Action>):Promise<void> => {
	dispatch({
		type: LOADING_TRUE
	})
	if (credentials) {
		const register = await join(credentials)
		if (register.status !== 201) dispatch({type: JOIN_FAILED, payload: register.message})
		else if (register.status === 201) dispatch({type: JOIN_SUCCESSFUL})
	} else dispatch({type: JOIN_FAILED})
}

export const retrieve_logged_action = () => async(dispatch:Dispatch<Action>):Promise<void> => {
	dispatch({type: LOADING_TRUE})
	const user = await get_current_user()
	if (user) {
		if (user.name === null) {
			dispatch({type: TOKEN_EXP})
		} else dispatch({type: LOGIN_SUCCESSFUL, payload: user})
	}else dispatch({type: LOGIN_FAILED})
}