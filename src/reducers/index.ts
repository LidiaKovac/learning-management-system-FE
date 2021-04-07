import {combineReducers} from "redux"
import {user_reducer} from "./user_reducer"
import {file_reducer} from "./files_reducer"
import { event_reducer } from "./events_reducer"
import { class_reducer } from "./class_reducer"
import { task_reducer } from "./todos_reducers"

export default combineReducers({
    user: user_reducer,
    file: file_reducer,
    events: event_reducer,
    classes: class_reducer,
    tasks: task_reducer
})
