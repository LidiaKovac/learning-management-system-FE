
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState, AppThunk } from '../store';

const initialState = {
	logged_user: {
		name: '',
		last_name: '',
		email: '',
		role: '',
		status: ''
	},
	loginStatus: ""
}


export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoginStatus: (state, action: PayloadAction<string>) => {
			state.loginStatus = action.payload
		},

	},
});

export const { setLoginStatus } = userSlice.actions;



export default userSlice.reducer;