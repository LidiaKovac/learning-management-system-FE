import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState, AppThunk } from '../store';

const initialState:eventInitialState = {
	selected_date: new Date(),
    your_events: [],
	event_by_date: [],
	homework: [],
	submitted: []
}


export const eventSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		addEvent: (state, action: PayloadAction<IEvent>) => {
			state.your_events = [...state.your_events, action.payload]
		},
		removeEvent: (state, action: PayloadAction<string>)=> {
			state.your_events = state.your_events.filter(event => event.event_id === action.payload)
		},
        setSelectedDate: (state, action: PayloadAction<Date>) => {
			state.selected_date = action.payload
			state.your_events = state.your_events.filter(ev => ev.startDate === action.payload)
		}

	},
});

export const { addEvent, removeEvent, setSelectedDate } = eventSlice.actions;



export default eventSlice.reducer;
