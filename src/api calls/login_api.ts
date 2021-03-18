import axios, { ResponseType } from "axios"
import {LoginData} from "../interfaces/LoginTypes"
import {useCookies} from "react-cookie"
import {get_token_from_cookies} from "../utils"
const {REACT_APP_BACKEND_URL} = process.env

export const login = async(data:LoginData):Promise<any> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}login/`, {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
        return await response.json()
}
export const get_current_user = async():Promise<Object> => {
    const user = await fetch(`${REACT_APP_BACKEND_URL}login/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        }
    })
    const json = await user.json()
    return {name: json.name, last_name: json.last_name, email: json.email, role: json.role}
}
