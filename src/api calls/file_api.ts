import {get_token_from_cookies} from "../utils/index"
import {ResponseFile} from "../interfaces/FileTypes"
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