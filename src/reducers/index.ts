import {combineReducers} from "redux"
import {user_reducer} from "./user_reducer"

export default combineReducers({
    user: user_reducer
})
