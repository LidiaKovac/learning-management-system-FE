import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_scheduled_action } from "../../actions/events_actions"
import { rootInitialState, SelectOption } from "../../interfaces/interfaces"
import "./Agenda.scss"

const Agenda: React.FC = () => {
	const dispatch = useDispatch()
	const events = useSelector((state:rootInitialState)=> state.events.your_events)
	const role = useSelector((state:rootInitialState)=> state.user.logged_user.role)
	useEffect(()=> {
		dispatch(get_scheduled_action())
	}, [])
	return <div className="agenda__wrap">
			<span>Your events: </span> 
			{events.length > 0 ? events.map((ev)=><div className="agenda__single bg">{ev.name}</div>) : "There are no events."}
		</div>
	
}

export default Agenda
