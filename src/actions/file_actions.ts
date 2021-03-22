import { Dispatch } from "react"
import { Action } from "../interfaces/interfaces"
import { CHANGE_TYPE, LOADING_TRUE, ERROR } from "./action_types"

export const change_type_action = (type:String) => async(dispatch: Dispatch<Action>):Promise<void> => {
    if (typeof type === "string") {
        dispatch({type: CHANGE_TYPE, payload: type})
        
    } else (dispatch({type: ERROR, payload: "Type must be a String. How did we get here?"}))
}