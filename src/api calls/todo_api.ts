import {get_token_from_cookies} from "../utils/index"
const {REACT_APP_BACKEND_URL} = process.env

export const create_todo = async(todo:Todo) => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}todo/`, {
        method: "POST",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
        return await response.json()
}

export const get_todos = async() => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}todo/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    })
        return await response.json()
}

export const check_todo = async(id:number) => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}todo/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            done: true
        })
    
})
    return await response.json()
}