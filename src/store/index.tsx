//the redux (wuth thunk) store is made of 3 parts: 
//1 - Calling the browser extension
//2 - Combining the reducers
//3 - Exporting with Thunk 

import {createStore, combineReducers, Store} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"

import {taskReducer} from "../reducers"
import { State } from "../interfaces";

//1: Calling and setting the browser extension. Since this is a TS project, we need to declare the interface. 
//The npm package redux-devtools-extension contains the typings for composing the enhancer, so we can change the line: 

// const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//with composeDevTool(...) in the export. 


//2: Combining the reducers and associates reducers to state values.

const rootReducer = combineReducers({
  to_do: taskReducer,
});

//3: Exporting and configuring the store

export default function configureStore():Store<State, any> {
    return createStore(
      rootReducer, undefined,
      composeWithDevTools()
    );
  }
