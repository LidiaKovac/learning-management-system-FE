import { IEvent } from "../interfaces/interfaces"
import { get_token_from_cookies } from "../utils"
const {REACT_APP_BACKEND_URL} = process.env


export const create_hw = async(event_id:number, body:string):Promise<IEvent> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}homework/${event_id}`, {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include",
        body: JSON.stringify({content: body})
    })
        return await response.json()
}

export const grade_hw = async(id:number, grade:number) => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}homework/grade/${id}`, {
        "method": "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include",
        body: JSON.stringify({grade: grade})
    })
        return await response.json()
}