import { Dispatch } from "react";
import {
  LOADING_TRUE,
  ADD_TODO,
  GET_TODO,
  LOADING_FALSE
} from "./action_types";
import { Action, IEvent } from "../interfaces/interfaces";
import { Todo } from "../interfaces/TodoInterfaces";
import { check_todo, create_todo, get_todos } from "../api calls/todo_api";

export const add_todo_action = (todo:Todo) => async (
  dispatch: Dispatch<Action>
): Promise<void> => {
  dispatch({
    type: LOADING_TRUE,
  });
  if (todo) {
    await create_todo(todo);
    //dispatch({ type: ADD_TODO, payload: new_task });
    const tasks = await get_todos();
    dispatch({ type: ADD_TODO, payload: tasks.filter((t:Todo)=> !t.done) });
    dispatch({ type: LOADING_FALSE });
  }
  dispatch({ type: LOADING_FALSE });
};

export const check_todo_action = (id:number) => async (
    dispatch: Dispatch<Action>
  ): Promise<void> => {
    dispatch({
      type: LOADING_TRUE,
    });
      await check_todo(id);
      //dispatch({ type: ADD_TODO, payload: new_task });
      //dispatch({ type: ADD_TODO, payload: tasks });
      dispatch({ type: LOADING_FALSE });
  };

  export const get_todo_action = () => async (
    dispatch: Dispatch<Action>
  ): Promise<void> => {
    dispatch({
      type: LOADING_TRUE,
    });
      const tasks = await get_todos();
      dispatch({ type: GET_TODO, payload: tasks });
      //dispatch({ type: ADD_TODO, payload: tasks });
      dispatch({ type: LOADING_FALSE });
  };
