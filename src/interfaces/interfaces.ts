import { FileInitialState } from "./FileTypes";
import { JoinData } from "./LoginTypes";



export interface Action {
	type: String
	payload?: String | Object
}
export interface SelectOption {
	value: String
	label: String
}

export interface rootInitialState {
	user:initialState
	file: FileInitialState
	events: eventInitialState
}
export interface User {
	user_id: number 
	name: String
	last_name: String
	email: String
	role: String
	pronouns: String
	birthday: String
	profile_picture: String
}

export interface LoggedUser {
	name: String | null
	last_name: String | null
	email: String | null
	role: String | null
	status: String | null
}
export interface initialState {
	logged_user: User | {},
	selected_user: Object,
	is_authorized: Boolean,
	loading: Boolean,
	new_user: Object,
	error: String,
	logged_out: Boolean
}
export interface eventInitialState {
	selected_date: Date
    your_events: Array<IEvent>
}
export interface LoggedState {
	user: {
		logged_user: User,
		selected_user: User,
		is_authorized: Boolean,
		loading: Boolean,
		new_user: JoinData,
		error: String
	}
}
export interface TokenError {
	message: string
}


export interface IEvent {
	name: string | null
	type: string | null
    description: string | null
	startDate: Date | null
    endDate: Date | null
}