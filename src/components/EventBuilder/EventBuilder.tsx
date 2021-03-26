import React, { useState } from "react"
import { useDispatch } from "react-redux"
import AsyncSelect from "react-select"
import {SelectOption} from "../../interfaces/interfaces"

const EventBuilder = () => {
    const options = [
		{ value: "homework", label: "Homework" },
		{ value: "exam", label: "Exam" },
	]
	const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.currentTarget.value)
    }
    const onChangeHandler__type = (val:SelectOption|null) => {
        console.log(val)
    }
    const dispatch = useDispatch()
	
    return <div className="agenda__add">
			<input type="text" placeholder="Name of the event" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onChangeHandler(e)} />
			<AsyncSelect
				options={options}
				id="type"
				isSearchable={false}
				defaultOptions
                className="agenda__select"
                 classNamePrefix="agenda__select"
				onChange={(val: SelectOption | null) => onChangeHandler__type(val)}
			/>
			<textarea placeholder="Brief description" rows={4} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>onChangeHandler(e)} />
            <div className="agenda__dates">
            <input type="datetime-local" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onChangeHandler(e)}/>
            <input type="datetime-local" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onChangeHandler(e)}/>
            </div>
            
            <button className="submit" >Submit event</button>
		</div>
}

export default EventBuilder