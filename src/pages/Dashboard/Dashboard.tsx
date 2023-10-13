import Calendar from "../../components/Calendar/Calendar"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { useAppDispatch } from "../../store"
// import styles from "./Component.module.scss"
export const Dashboard = () => {
    const asyncDispatch = useAppDispatch()
    return (
        <div className="dash__wrap">

        <Sidebar/>
        <Calendar/>
        </div>
    )

}