
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState, AppThunk } from '../store';

const initialState = {
	logged_user: {
		name: '',
		last_name: '',
		email: '',
		role: '',
	},
	error: "",
	loginStatus: ""
}

export const login = createAsyncThunk("user/login", (fd: FormData, { rejectWithValue }):Promise<{token: string, user: User} | string> => new Promise(async (res, rej) => {
	let raw = await fetch(process.env.REACT_APP_BACKEND_URL + "login", {
		method: "POST",
		body: fd
	})
	if (raw.ok) {
		let {token} = await raw.json()
		let rawUser = await fetch(process.env.REACT_APP_BACKEND_URL + "login/me", {
			headers: {
				Authorization: "Bearer " + token
			}
		})
		let {message: user}= await rawUser.json()
		res({token, user} as {token: string, user: User})
	} else {
		let {message} = await raw.json()
		rej(rejectWithValue(message))
	}
}))

export const singup = createAsyncThunk("user/signup", (fd: FormData, { rejectWithValue }):Promise<string | string> => new Promise(async (res, rej) => {
	let raw = await fetch(process.env.REACT_APP_BACKEND_URL + "login/new", {
		method: "POST",
		body: fd
	})
	if (raw.ok) {
		let {token} = await raw.json()
		res(token)
	} else {
		let {message} = await raw.json()
		rej(rejectWithValue(message))
	}
}))

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoginStatus: (state, action: PayloadAction<string>) => {
			state.loginStatus = action.payload
		},

	},
	extraReducers(builder) {
		builder.addCase(login.fulfilled, (state, action)=> {
			let res = action.payload as {token: string, user: User}
			state.logged_user = res.user
			localStorage.setItem("token", res.token)
		})
		builder.addCase(login.rejected, (state, action)=> {
			state.loginStatus = action.payload as string
	})}
});

export const { setLoginStatus } = userSlice.actions;



export default userSlice.reducer;