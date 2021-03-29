import { IEvent } from "../interfaces/interfaces"
import { get_token_from_cookies } from "../utils"
const {REACT_APP_BACKEND_URL} = process.env


export const create_hw = async(event_id:number, body:any):Promise<IEvent> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}homework/${event_id}`, {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        },
        credentials: "include",
        body: JSON.stringify(body)
    })
        return await response.json()
}