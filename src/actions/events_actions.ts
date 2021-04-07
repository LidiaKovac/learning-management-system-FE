import { Dispatch } from "react";
import {
  LOADING_TRUE,
  ADD_EVENT,
  LOADING_FALSE,
  GET_BY_DATE,
  GET_HW,
  ERROR,
} from "./action_types";
import { Action, IEvent } from "../interfaces/interfaces";
import {
  create_event,
  get_by_date,
  get_created,
  get_homework,
  get_homework_created,
  get_scheduled,
} from "../api calls/event_api";
import { get_single_class } from "../api calls/class_api";

export const add_event_action = (event: IEvent | object) => async (
  dispatch: Dispatch<Action>
): Promise<void> => {
  dispatch({
    type: LOADING_TRUE,
  });
  if (event) {
    const new_event = await create_event(event);
    dispatch({ type: ADD_EVENT, payload: new_event });
    const events = await get_scheduled();
    dispatch({ type: ADD_EVENT, payload: events });
    dispatch({ type: LOADING_FALSE });
  }
  dispatch({ type: LOADING_FALSE });
};

export const get_scheduled_action = () => async (
  dispatch: Dispatch<Action>
): Promise<void> => {
  dispatch({
    type: LOADING_TRUE,
  });
  const events = await get_scheduled();

  dispatch({ type: ADD_EVENT, payload: events });
  dispatch({ type: LOADING_FALSE });
};

export const get_created_action = () => async (
  dispatch: Dispatch<Action>
): Promise<void> => {
  dispatch({
    type: LOADING_TRUE,
  });
  const events = await get_created();

  dispatch({ type: ADD_EVENT, payload: events });
  dispatch({ type: LOADING_FALSE });
};

export const get_by_date_action = (date: Date) => async (
  dispatch: Dispatch<Action>
): Promise<void> => {
  dispatch({
    type: LOADING_TRUE,
  });
  const events = await get_by_date(date);

  dispatch({ type: GET_BY_DATE, payload: events });
  dispatch({ type: LOADING_FALSE });
};

export const get_by_date_created_action = (date: Date) => async (
  dispatch: Dispatch<Action>
): Promise<void> => {
  dispatch({
    type: LOADING_TRUE,
  });
  const events = await get_by_date(date);

  dispatch({ type: GET_BY_DATE, payload: events });
  dispatch({ type: LOADING_FALSE });
};

export const get_homework_action = () => async (
  dispatch: Dispatch<Action>
): Promise<void> => {
  dispatch({
    type: LOADING_TRUE,
  });
  const homework = await get_homework();
  if (homework instanceof Array) {

    let hw_w_class = [...homework]
    for (let i = 0; i< homework.length; i++) {
      let single = await get_single_class(homework[i].ClassClassId)
      hw_w_class[i].class = single.class
      delete hw_w_class[i].ClassClassId
    }
  
    dispatch({ type: GET_HW, payload: homework });
    dispatch({ type: LOADING_FALSE });
  } else dispatch({type: ERROR, payload: "Homework not iterable"})
};

export const get_created_homework_action = () => async (
  dispatch: Dispatch<Action>
): Promise<void> => {
  dispatch({
    type: LOADING_TRUE,
  });
  const homework = await get_homework_created();

  dispatch({ type: GET_HW, payload: homework });
  dispatch({ type: LOADING_FALSE });
};
