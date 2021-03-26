import { IEvent } from "../interfaces/interfaces"
const {REACT_APP_BACKEND_URL} = process.env


export const create_event = async(data:IEvent):Promise<any> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}event/`, {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
        return await response.json()
}