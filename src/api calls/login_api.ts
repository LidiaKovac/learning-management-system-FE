
import {LoginData} from "../interfaces/LoginTypes"
import {LoggedUser} from "../interfaces/interfaces"
import {get_token_from_cookies} from "../utils"
import axios from "axios"
import { config } from "node:process"
const {REACT_APP_BACKEND_URL} = process.env

// export const login = async(data:LoginData):Promise<any> => {
//     const response = await fetch(`${REACT_APP_BACKEND_URL}login/`, {
//         "method": "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(data)
//     })
//         return await response.json()
// }
export const login = async(data:LoginData):Promise<any> => {
    const response = await axios.post(`${REACT_APP_BACKEND_URL}login/`, data, {withCredentials: true} )
    return response
}
export const get_current_user = async():Promise<LoggedUser> => {
    console.log("this is a cookie", document.cookie)
    const user = await fetch(`${REACT_APP_BACKEND_URL}login/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        },
        credentials: "include"
    })
    
    const json = await user.json()
    if (json.message.name) {
        return {name: json.message.name, last_name: json.message.last_name, email: json.message.email, role: json.message.role, status: null}
    } else {
     return {name:null, last_name: null, email: null, role:null, status: json.message} }
}

export const logout = async() => {
    await fetch(`${REACT_APP_BACKEND_URL}login/logout`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        }
    })
}