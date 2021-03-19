import { JoinData } from "./LoginTypes";


export interface Task {
	id: String
	title: String
	created: String
	checked: String
}

export interface Action {
	type: String
	payload: Task
}
export interface SelectOption {
	value: String
	label: String
}

export interface rootInitialState {
	user:initialState
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
	logged_user: Object,
	selected_user: Object,
	is_authorized: Boolean,
	loading: Boolean,
	new_user: Object,
	error: String
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

export interface IProps {
    add_to_list: (task: Task)=>void,
    remove_from_list: (task: Task)=>void,
    check_as_done: (task: Task)=>void,
    
}

export interface TokenError {
	message: string
}
