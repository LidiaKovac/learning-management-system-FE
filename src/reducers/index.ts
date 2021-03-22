import {combineReducers} from "redux"
import {user_reducer} from "./user_reducer"
import {file_reducer} from "./files_reducer"

export default combineReducers({
    user: user_reducer,
    file: file_reducer
})
