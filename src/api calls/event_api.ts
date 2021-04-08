import { ResponseEvent } from "../interfaces/EventTypes"
import { IEvent } from "../interfaces/interfaces"
import { get_token_from_cookies } from "../utils"
const {REACT_APP_BACKEND_URL} = process.env


export const create_event = async(data:IEvent | object):Promise<IEvent> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}event/`, {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
        return await response.json()
}

export const get_scheduled = async():Promise<ResponseEvent | Array<null>> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}event/me`, {
        "method": "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include"
    })
    const json = await response.json()
    console.log(json)
    if (json.status === 204) return []
    else return json
}

export const get_created = async():Promise<ResponseEvent | Array<null>> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}event/created/me`, {
        "method": "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include"
    })
    const json = await response.json()
    console.log(json)
    if (json.status === 204) return []
    else return json
}

export const get_by_date = async(date:Date):Promise<ResponseEvent | Array<null>> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}event/search/date/${date}`, {
        "method": "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include"
    })
    const json = await response.json()
    if (json.status === 204) return []
    else return json
}

export const get_homework = async() => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}event/homework/me`, {
        "method": "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include"
    })
    const json = await response.json()
    if (json.status === 204) return []
    else return json.content
}

export const get_homework_created = async() => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}homework/created/me`, {
        "method": "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include"
    })
    const json = await response.json()
    if (json.status === 204) return []
    else return json.content
}