
import {LoginData} from "../interfaces/LoginTypes"
import {LoggedUser} from "../interfaces/interfaces"
import {get_token_from_cookies} from "../utils"
const {REACT_APP_BACKEND_URL} = process.env

export const search_class = async(query:String):Promise<any> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}class/search`, {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        },
        credentials: "include",
        body: JSON.stringify({query: query})
    })
        const json = await response.json()
        if (json.length > 0) return json
        else return []
}

export const enroll = async(id:number):Promise<any> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}class/enroll/${id}`, {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        },
        credentials: "include"
    })
        return await response.json()
}

export const create_new_course = async(class_n:Object | undefined):Promise<any> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}class`, {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        },
        credentials: "include",
        body: JSON.stringify(class_n)
    })
        return await response.json()
}