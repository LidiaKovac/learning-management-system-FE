import Notes from "../../assets/notes.png"
import Graph from "../../assets/graph.png"
import Books from "../../assets/booka.png"
import Settings from "../../assets/settings.png"
import Logout from "../../assets/door.png"
import Homework from "../../assets/homework.png"

import {Link, useHistory} from "react-router-dom"
import "./Menu.scss"
import { logout } from "../../api calls/login_api"
import { useDispatch } from "react-redux"
import { LOGOUT } from "../../actions/action_types"

export const Menu:React.FC = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	return (
		<>
			<Link to="/notes">
            <div className="dashboard__menu-item">
				<img src={Notes} alt="notes" />
				Notes
			</div>
            </Link>
			<div className="dashboard__menu-item">
				<img src={Graph} alt="stats" />
				Stats
			</div>
			<Link to="/classes/search">
			<div className="dashboard__menu-item">
				<img src={Books} alt="books" />
				Classes
			</div>
			</Link>
			<div className="dashboard__menu-item">
				<img src={Settings} alt="settings" />
				Settings
			</div>
			<div className="dashboard__menu-item" onClick={()=> {
				logout()
				dispatch({type: LOGOUT})
				history.push("/")
				}}>
				<img src={Logout} alt="door" />
				Logout
			</div>
		</>
	)
}

export const TeacherMenu:React.FC = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	return (
		<>
			<div className="dashboard__menu-item">
				<img src={Homework} alt="notes" />
				Homework
			</div>
			<div className="dashboard__menu-item">
				<img src={Graph} alt="stats" />
				Stats
			</div>
			<div className="dashboard__menu-item">
				<img src={Books} alt="books" />
				Classes
			</div>
			<div className="dashboard__menu-item">
				<img src={Settings} alt="settings" />
				Settings
			</div>
			<div className="dashboard__menu-item" onClick={()=> {
				logout()
				dispatch({type: LOGOUT})
				history.push("/")
				}}>
				<img src={Logout} alt="door"  />
				Logout
			</div>
		</>
	)
}
