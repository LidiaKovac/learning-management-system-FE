import {get_token_from_cookies} from "../utils/index"
import {ResponseFile, FileObject, ResponseNote, ResponseMultipleFile } from "../interfaces/FileTypes"
const {REACT_APP_BACKEND_URL} = process.env

export const upload_file = async(type:String, body:FormData):Promise<ResponseFile> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}files/upload/${type}`, {
        method: "POST",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: body
    })
        return await response.json()
}

export const create_note = async(note:FileObject):Promise<ResponseNote> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}files/upload/markdown`, {
        method: "POST",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    
})
    return await response.json()
}

export const edit_note = async(id:number, new_note:FileObject):Promise<ResponseNote> => {
    
    const response = await fetch(`${REACT_APP_BACKEND_URL}files/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(new_note)
    })
    return await response.json()
}

export const get_your_files = async():Promise<ResponseMultipleFile> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}files/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    })
    return await response.json()
}

export const delete_file = async(id:number):Promise<null> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}files/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    })
    return await response.json()
}