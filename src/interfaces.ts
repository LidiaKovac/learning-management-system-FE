export interface State {
	tasks: {
		data: Task[]
	}
	fullfilled: {
		data: Task[]
	}
}

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

export interface initialState {
	tasks: {
		data: [
			{
				id: String
				title: String
				created: String
				checked: String
			}
		]
	}
	fullfilled: {
		data: []
	}
}

export interface IProps {
    add_to_list: (task: Task)=>void,
    remove_from_list: (task: Task)=>void,
    check_as_done: (task: Task)=>void,
    to_do: State
}
