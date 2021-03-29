import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AsyncSelect from "react-select"
import { add_event_action } from "../../actions/events_actions"
import {IEvent, rootInitialState, SelectOption} from "../../interfaces/interfaces"
import Spinner from "../Loader/Loader"

const EventBuilder = () => {
    const loading = useSelector((state:rootInitialState)=> state.user.loading)
    const [event, setEvent] = useState<object | IEvent>({
        name: "",
        type: "",
        description: "",
        startDate: new Date(),
        endDate: new Date()
    })
    const dispatch = useDispatch()

    const options = [
		{ value: "homework", label: "Homework" },
		{ value: "exam", label: "Exam" },
	]
	const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEvent({
            ...event, 
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }
    const onChangeHandler__type = (val:SelectOption|null) => {
       setEvent({
           ...event,
           type: val?.value
       })
    }
	
    return <div className="agenda__add">
			<input type="text" id="name" placeholder="Name of the event" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onChangeHandler(e)} />
			<AsyncSelect
				options={options}
				id="type"
				isSearchable={false}
				defaultOptions
                className="agenda__select"
                 classNamePrefix="agenda__select"
				onChange={(val: SelectOption | null) => onChangeHandler__type(val)}
			/>
			<textarea placeholder="Brief description" id="description" rows={4} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>onChangeHandler(e)} />
            <AsyncSelect
				options={options_class}
				id="type"
				isSearchable={false}
				defaultOptions
                className="agenda__select"
                 classNamePrefix="agenda__select"
				onChange={(val: SelectOption | null) => onChangeHandler__type(val)}
			/>
            <div className="agenda__dates">
            <input type="datetime-local" id="startDate" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onChangeHandler(e)}/>
            <input type="datetime-local" id="endDate" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onChangeHandler(e)}/>
            </div>
            
            <button className="submit" onClick={()=>dispatch(add_event_action(event!))} >{!loading ? "Submit event" : <Spinner/>}</button>
		</div>
}

export default EventBuilder