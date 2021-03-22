import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { LoggedState } from "../../interfaces/interfaces"
import Loader from "react-loader-spinner"

const Redirect = () => {
    const history = useHistory()
    const role = useSelector((state:LoggedState) => state?.user?.logged_user?.role)
    useEffect(()=> {
        console.log(role)
        if (role === "student") {
            history.push("/studentdash")
        } else if (role === "teacher") {
            history.push("/teacherdash")
        } else if(role === "admin") {history.push("/settings")} 
        else role ?? history.push("/")
    }, [])
    return (
        <div style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Loader 
            type="ThreeDots"
            color="#00B4FF" 
            />
        </div>
    )
}

export default Redirect