export const get_token_from_cookies = (cookies:String) => {
    console.log(document.cookie)
    console.log(cookies)
    const arr = cookies?.split(";") // splits in an array of string, each containing a cookie
    console.log(arr)
    const token = arr[1]?.split("=") 
    console.log(token)
    return token && token[1]
}