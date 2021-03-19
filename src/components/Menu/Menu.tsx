import Notes from "../../assets/notes.png"
import Graph from "../../assets/graph.png"
import Books from "../../assets/booka.png"
import Settings from "../../assets/settings.png"
import Logout from "../../assets/door.png"
import Homework from "../../assets/homework.png"

import {Link} from "react-router-dom"
import "./Menu.scss"

export const Menu:React.FC = () => {
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
			<div className="dashboard__menu-item">
				<img src={Books} alt="books" />
				Classes
			</div>
			<div className="dashboard__menu-item">
				<img src={Settings} alt="settings" />
				Settings
			</div>
			<div className="dashboard__menu-item">
				<img src={Logout} alt="door" />
				Logout
			</div>
		</>
	)
}

export const TeacherMenu:React.FC = () => {
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
			<div className="dashboard__menu-item">
				<img src={Logout} alt="door" />
				Logout
			</div>
		</>
	)
}
