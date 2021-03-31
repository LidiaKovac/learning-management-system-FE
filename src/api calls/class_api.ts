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

        for (let i = 0; i< json.length; i++) {
            const author_found = await get_author(json[i].author)
            json[i].author_data = author_found?.name + " " + author_found?.last_name
            console.log(json)
        }
        delete json.author
        if (json.length > 0) return json
        else return []
}

export const get_author = async(id:number | undefined):Promise<any> => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}user/${id}`, {
        "method": "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        },
        credentials: "include"
    })
        const json = await response.json()
        if (json) return {name: json.name, last_name: json.last_name }
        else return null
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

export const get_created_classes = async() => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}class/me`, {
        "method": "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        },
        credentials: "include",
    })
        const json = await response.json()
        if (typeof json !== "number" && json.length > 0) return json 
        else return []
}


export const get_enrolled = async() => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}class/me/enrolled`, {
        "method": "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_token_from_cookies(document.cookie)}`
        },
        credentials: "include",
    })
        const json = await response.json()
        for (let i = 0; i< json.length; i++) {
            const author_found = await get_author(json[i].author)
            json[i].author_data = author_found?.name + " " + author_found?.last_name
            console.log(json)
        }
        delete json.author
        if (typeof json !== "number" && json.length > 0) return json 
        else return []
}