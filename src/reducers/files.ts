import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState, AppThunk } from '../store';



const initialState:FileInitialState = {
	name: "",
    type: "",
    material: new File([], "sample"),
    your_files: [],
    status: "",
    error: {message: ""},
    file_id: null,
    selected: {}
}



export const filesSlice = createSlice({
	name: 'files',
	initialState,
	reducers: {
		setFileType: (state, action: PayloadAction<string>) => {
			state.type = action.payload
		},
		setUploadStatus: (state, action:PayloadAction<FileInitialState["status"]>)=> {
			state.status = action.payload
		},
        setSelectedFile: (state, action:PayloadAction<FileObject>) => {
            state.selected = state.your_files.filter((file:FileObject) => file.file_id === action.payload.file_id)[0]
        }

	},
});

export const { setFileType, setUploadStatus, setSelectedFile } = filesSlice.actions;



export default filesSlice.reducer;
