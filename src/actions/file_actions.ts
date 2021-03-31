import { Dispatch } from "react"
import { create_note, edit_note, get_your_files } from "../api calls/file_api"
import { get_tinyurl } from "../api calls/url_api"
import { FileObject } from "../interfaces/FileTypes"
import { Action } from "../interfaces/interfaces"
import { CHANGE_TYPE, LOADING_TRUE, ERROR, UPLOAD_SUCCESSFUL, TOKEN_EXP, GET_YOUR_FILES, LOADING_FALSE } from "./action_types"

export const change_type_action = (type:String) => async(dispatch: Dispatch<Action>):Promise<void> => {
    if (typeof type === "string") {
        dispatch({type: CHANGE_TYPE, payload: type})
        
    }
}

export const upload_markdown_action = (note:FileObject) => async(dispatch: Dispatch<Action>):Promise<void> => {
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

export const auto_save_note = (note:FileObject, id:number) => async(dispatch:Dispatch<Action>):Promise<void> => {
    dispatch({type: LOADING_TRUE})
    const response = await edit_note(id, note)
    if (response.status === 201) {
        dispatch({type: UPLOAD_SUCCESSFUL, payload: response.file_id})
        const files = await get_your_files()
        dispatch({type: GET_YOUR_FILES, payload: files.content})
    }
        else dispatch({type: ERROR, payload: response})
}

export const get_your_files_action = () => async(dispatch:Dispatch<Action>):Promise<void> => {
    dispatch({type: LOADING_TRUE})
    const response = await get_your_files()
    
    if (response.status === 200) {
        // let tiny_url:Array<string> = []
        // const prom = response.content.map((file)=> 
        //    get_tinyurl(file.description).then((url) => {
        //    tiny_url.push(url)
        //    return tiny_url
        // })
        // )
        // Promise.all(prom).then((res) => 
        // {
            
        //     res[0].forEach((r, index)=> {
        //         if (r) {
        //             response.content[index].description = r
        //         }
        //         console.log(response.content[index])
        //     })
        //     dispatch({type: GET_YOUR_FILES, payload: response.content})
        // })
        // dispatch({type: LOADING_FALSE})
        dispatch({type: GET_YOUR_FILES, payload: response.content})
        
    } else dispatch({type: ERROR, payload: response.message})
}