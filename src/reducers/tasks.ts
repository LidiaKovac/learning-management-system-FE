


import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState, AppThunk } from '../store';


const initialState:{tasks: Array<Todo>} = {
	tasks: []
} 

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Todo>) => {
			state.tasks = [...state.tasks, action.payload]
		},
		removeTodo: (state, action:PayloadAction<Todo>)=> {
			state.tasks = state.tasks.filter(task => task.todo_id === action.payload.todo_id)
		},
		checkTodo: (state, action:PayloadAction<string>) => {
			let foundTask = state.tasks.find(task => task.todo_id === action.payload) as Todo
			foundTask.done = true 
			state.tasks = state.tasks.filter(task => task.todo_id !== action.payload)
			state.tasks = [...state.tasks, foundTask]
		}

	},
});

export const { addTask, removeTodo, checkTodo } = tasksSlice.actions;



export default tasksSlice.reducer;
