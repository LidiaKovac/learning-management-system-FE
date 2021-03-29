import { ResponseEvent } from "../interfaces/EventTypes"
import { IEvent } from "../interfaces/interfaces"
import { get_token_from_cookies } from "../utils"
const {REACT_APP_BACKEND_URL} = process.env


export const create_event = async(data:IEvent | object):Promise<IEvent> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}event/`, {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
        return await response.json()
}

export const get_scheduled = async():Promise<ResponseEvent | Array<any>> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}event/me`, {
        "method": "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        },
        credentials: "include"
    })
    const json = await response.json()
    if (json.status === 204) return []
    else return json.content
}