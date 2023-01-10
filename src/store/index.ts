import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userReducer from "../reducers/user"
import loadingReducer from "../reducers/loading"
import fileReducer from "../reducers/files"
import eventReducer from "../reducers/events"
import classReducer from "../reducers/classes"
import taskReducer from "../reducers/tasks"


export const store = configureStore({
  reducer: {
    user: userReducer,
    file: fileReducer,
    events: eventReducer,
    classes: classReducer,
    tasks: taskReducer,
    loading: loadingReducer
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
