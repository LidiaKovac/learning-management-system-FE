const {REACT_APP_BACKEND_URL} = process.env

export const find_user = async(id: number) => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}user/${id}`, {
        "method": "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include"
    })
        return await response.json()
} 