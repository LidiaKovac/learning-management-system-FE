import React, { Dispatch, useEffect } from "react"
import { connect } from "react-redux"
import { State, Task, Action, IProps } from "../interfaces"
import uniqid from "uniqid"
import moment from "moment"

import "../styling/landing.scss"

const mapStateToProps = (state: State) => state
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	add_to_list: (task: Task) =>
		dispatch({ type: "ADD_TASK_TO_LIST", payload: task }),
	remove_from_list: (task: Task) =>
		dispatch({ type: "REMOVE_TASK_FROM_LIST", payload: task }),
	check_as_done: (task: Task) =>
		dispatch({ type: "CHECK_AS_DONE", payload: task }),
})


const Landing:React.FC<IProps> = (props) => {
	useEffect(()=>{
        console.log(props)
    })
	const buildAndAdd = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter") {
			let newTask = {
				title: e.currentTarget.value,
				id: uniqid(),
				created: moment().format("DD/MM"),
				checked: moment().format("DD/MM"),
			}  
			props.add_to_list(newTask)
            e.currentTarget.value = ""
		}
	}
    
	return (
		<div className="landing-wrap">
			<div className="new-item">
				<input
					type="text"
					placeholder="What are you going to do today?"
					className="add-new-input"
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
						buildAndAdd(e)
					}
				/>
			</div>
		<span>----------- <strong>TO-DO</strong> -----------</span>	
        <hr/>
			{props.to_do &&
				props.to_do.tasks.data.map((task: Task) => (
					<div className="to-do-item">
						<input type="checkbox" key={uniqid()} checked={false} onChange={()=>props.check_as_done(task)}/>
						{task.title}
					</div>
				))}
            <hr/>
            <span>----------- <strong>DONE</strong> -----------</span>
            <hr/>
            {props.to_do.fullfilled.data.length>0 && props.to_do.fullfilled.data.map((task:Task)=> <div className="to-do-item">{task.title}</div>)}
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
