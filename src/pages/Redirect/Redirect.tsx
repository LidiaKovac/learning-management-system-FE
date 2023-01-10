import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"

const Redirect = () => {
    //HOOKS 
    const history = useHistory()

    //USE SELECTOR
    const role = useSelector((state:LoggedState) => state?.user?.logged_user?.role)

    //USE EFFECT
    useEffect(()=> {
        if (role === "student") {
            history.push("/studentdash")
        } else if (role === "teacher") {
            history.push("/teacherdash")
        } else if(role === "admin") {history.push("/settings")} 
        else history.push("/")
    }, [])
    
    return (
        <div style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
           Redirecting
        </div>
    )
}

export default Redirect