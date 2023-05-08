import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

const Redirect = () => {
    //HOOKS 
    const history = useNavigate()

    //USE SELECTOR
    const role = useSelector((state:LoggedState) => state?.user?.logged_user?.role)

    //USE EFFECT
    useEffect(()=> {
        if (role === "student") {
            history("/studentdash")
        } else {
            history("/teacherdash")
        } 
    }, [])
    
    return (
        <div style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
           Redirecting
        </div>
    )
}

export default Redirect