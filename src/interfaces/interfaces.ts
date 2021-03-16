

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
export interface initialState {
	logged_user: Object,
	selected_user: Object,
	is_authorized: Boolean,
	loading: Boolean,
	new_user: Object,
	error: String
}

export interface IProps {
    add_to_list: (task: Task)=>void,
    remove_from_list: (task: Task)=>void,
    check_as_done: (task: Task)=>void,
    
}
