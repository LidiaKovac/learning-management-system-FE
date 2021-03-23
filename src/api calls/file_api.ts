import {get_token_from_cookies} from "../utils/index"
import {ResponseFile, NoteObject, ResponseNote} from "../interfaces/FileTypes"
const {REACT_APP_BACKEND_URL} = process.env

export const upload_file = async(type:String, body:FormData):Promise<ResponseFile> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}files/upload/${type}`, {
        method: "POST",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        },
        body: body
    })
        return await response.json()
}

export const create_note = async(note:NoteObject):Promise<ResponseNote> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}files/upload/markdown`, {
        method: "POST",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    
})
    return await response.json()
}

export const edit_note = async(id:number, new_note:NoteObject):Promise<ResponseNote> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}files/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(new_note)
    })
    return await response.json()
}