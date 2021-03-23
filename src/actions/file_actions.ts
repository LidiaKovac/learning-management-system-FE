import { Dispatch } from "react"
import { create_note, edit_note } from "../api calls/file_api"
import { NoteObject } from "../interfaces/FileTypes"
import { Action } from "../interfaces/interfaces"
import { CHANGE_TYPE, LOADING_TRUE, ERROR, UPLOAD_SUCCESSFUL, LOGIN_FAILED, TOKEN_EXP } from "./action_types"

export const change_type_action = (type:String) => async(dispatch: Dispatch<Action>):Promise<void> => {
    if (typeof type === "string") {
        dispatch({type: CHANGE_TYPE, payload: type})
        
    }
}

export const upload_markdown_action = (note:NoteObject) => async(dispatch: Dispatch<Action>):Promise<void> => {
    dispatch({type: LOADING_TRUE})
    const response = await create_note(note)
    console.log(response)
    if (response.status === 201)
    {
        console.log(response.file_id)
        dispatch({type: UPLOAD_SUCCESSFUL, payload: response.file_id})
}

    else if (response.message === "jwt expired") {dispatch({type: TOKEN_EXP, payload: response}) 
}
    
}

export const auto_save_note = (note:NoteObject, id:number) => async(dispatch:Dispatch<Action>):Promise<void> => {
    dispatch({type: LOADING_TRUE})
    const response = await edit_note(id, note)
    if (response.status === 201) {
        dispatch({type: UPLOAD_SUCCESSFUL, payload: response.file_id})
    }
        else dispatch({type: ERROR, payload: response})
}