import { RootState, AppThunk } from '../store';
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState:classInitialState = {
	your_classes: [],
	selected_class: {} as any
}

export const classSlice = createSlice({
	name: 'class',
	initialState,
	reducers: {
		enroll: (state, action: PayloadAction<IClass>) => {
			state.your_classes = [...state.your_classes, action.payload]
		},
		selectClass: (state, action: PayloadAction<any>)=> {
			state.selected_class = action.payload
		},


	},
});

export const { enroll, selectClass } = classSlice.actions;



export default classSlice.reducer;
