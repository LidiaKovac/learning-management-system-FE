import "./Dashboard.scss"

import Graph from "../../assets/graph.png"

import Waving from "../../assets/waving.png"
import Tick from "../../assets/tick.png"
import Notebook from "../../assets/notebook.png"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router"

import { LoggedState } from "../../interfaces/interfaces"
import { retrieve_logged_action } from "../../actions/login_actions"

import GradeSummary from "../../components/GradeSummary/GradeSummary"
import Agenda from "../../components/Agenda/Agenda"
import Cal from "../../components/Calendar/Calendar"
import Todo from "../../components/Todo/Todo"
import RecentNotes from "../../components/RecentNotes/RecentNotes"
import { TeacherMenu } from "../../components/Menu/Menu"

const TeacherDashboard:React.FC = () => {
    //HOOKS
    const dispatch = useDispatch()
    const history = useHistory()
    const logged_user = useSelector((state:LoggedState) => state.user.logged_user)
    const is_auth = useSelector((state:LoggedState)=> state.user.is_authorized)

    //USEFFECTS
    useEffect(()=> {
        if(!is_auth) {
            history.push("/")
        }
        if (logged_user.name === undefined)
            dispatch(retrieve_logged_action())
    }, [])

    return (
    <div className="dashboard__wrap">
        <div className="dashboard__menu">
            <TeacherMenu/>
        </div>
        <div className="dashboard__main">
            <div className="dashboard__content">
                <div className="dashboard__header">
                    <img src={Waving} className="waving"/><span>Hello {logged_user.name}!</span> 
                </div>
                <div className="dashboard__quote">
                    "Education is the most powerful weapon you can use to change the world."
                </div>
                <div className="dashboard__quick-tab">
                    <div className="dashboard__graph">
                        <span className="graph__header">
                            <img src={Graph} alt="graph" className="icon"/> Grades
                        </span>
                        <GradeSummary/>
                    </div>
                    <div className="dashboard__todos">
                        <span className="todo__header">
                            <img src={Tick} alt="tick" className="icon"/> To do list
                        </span>
                        <Todo/>
                    </div>
                </div>
                <div className="dashboard__recent">
                    <div className="recent__header">
                      <img src={Notebook} alt="recent" className="icon" style={{marginRight: "10px"}}/>  Recent notes
                    </div>
                    <div className="recent__content">
                    <RecentNotes/> <RecentNotes/> <RecentNotes/> 
                    </div>
                </div>
            </div>
            <div className="dashboard__agenda">
                <Cal/>
                <Agenda/>
            </div>
        </div>
    </div>
    )
}

export default TeacherDashboard