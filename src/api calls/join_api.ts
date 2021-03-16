import { JoinData } from "../interfaces/LoginTypes"
const {REACT_APP_BACKEND_URL} = process.env


export const join = async(data:JoinData):Promise<any> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}login/new`, {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
        return await response.json()
}