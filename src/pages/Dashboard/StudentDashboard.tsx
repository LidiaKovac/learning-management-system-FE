import "./Dashboard.scss"

import Waving from "../../assets/waving.png"
import Tick from "../../assets/tick.png"
import Notebook from "../../assets/notebook.png"
import Graph from "../../assets/graph.png"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router"

import { LoggedState, rootInitialState } from "../../interfaces/interfaces"
import { retrieve_logged_action } from "../../actions/login_actions"

//import GradeSummary from "../../components/GradeSummary/GradeSummary"
import Agenda from "../../components/Agenda/Agenda"
import Cal from "../../components/Calendar/Calendar"
//import Todo from "../../components/Homework/Homework"
import RecentNotes from "../../components/RecentNotes/RecentNotes"
import {Menu} from "../../components/Menu/Menu"
import { get_scheduled_action } from "../../actions/events_actions"
import Homework from "../../components/Homework/Homework"
import { ComingSoon } from "../../components/ComingSoon/ComingSoon"
import { get_your_files_action } from "../../actions/file_actions"
import { Link } from "react-router-dom"

const StudentDashboard:React.FC = () => {
    //HOOKS
    const dispatch = useDispatch()
    const history = useHistory()
    const logged_user = useSelector((state:LoggedState) => state.user.logged_user)
    const is_auth = useSelector((state:LoggedState)=> state.user.is_authorized)
    const files = useSelector((state:rootInitialState)=> state.file.your_files)

    //USE EFFECT
    useEffect(()=> {
        if(!is_auth) {
            history.push("/")
        }
        if (logged_user.name === undefined)
            dispatch(retrieve_logged_action())
        dispatch(get_scheduled_action())
        dispatch(get_your_files_action())
    }, [])

    return (
    <div className="dashboard__wrap">
        <div className="dashboard__menu">
            <Menu/>
        </div>
        <div className="dashboard__main">
            <div className="dashboard__content">
                <div className="dashboard__header">
                    <img src={Waving} className="waving" alt="waving"/><span>Hello {logged_user.name}!</span> 
                </div>
                <div className="dashboard__quote">
                    "Be addicted to your passions, not your distractions."
                </div>
                <div className="dashboard__quick-tab">
                    <div className="dashboard__graph">
                        <span className="graph__header">
                            <img src={Graph} alt="graph" className="icon"/> Grades
                        </span>
                        {/* <GradeSummary/> */}
                        <ComingSoon/>
                    </div>
                    <div className="dashboard__todos">
                        <span className="todo__header">
                            <img src={Tick} alt="tick" className="icon"/> To do list
                        </span>
                        <Homework/>
                    </div>
                </div>
                <div className="dashboard__recent">
                    <div className="recent__header">
                      <img src={Notebook} alt="recent" className="icon" style={{marginRight: "10px"}}/>  Recent notes
                    </div>
                    <div className="recent__content">
                        {files?.filter((f)=> f.type === "markdown").reverse().slice(0,3).map((f, index)=>
                            
                                <RecentNotes content={f} key={index} />
                            
                        )}
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

export default StudentDashboard