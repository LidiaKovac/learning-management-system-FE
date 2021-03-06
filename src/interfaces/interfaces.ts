import { IClass, Section } from "./ClassInterfaces";
import { Homework } from "./EventTypes";
import { FileInitialState } from "./FileTypes";
import { JoinData } from "./LoginTypes";
import { Todo } from "./TodoInterfaces";

export interface Action {
  type: string;
  payload?: string | Object;
}
export interface SelectOption {
  value: string;
  label: string;
}

export interface rootInitialState {
  user: initialState;
  file: FileInitialState;
  events: eventInitialState;
  classes: classInitialState;
  tasks: {
    tasks: Array<Todo>;
  };
}
export interface User {
  user_id: number;
  name: string;
  last_name: string;
  email: string;
  role: string;
  pronouns: string;
  birthday: string;
  profile_picture: string;
}

export interface LoggedUser {
  name: string | null;
  last_name: string | null;
  email: string | null;
  role: string | null
  status: string | null;
}
export interface initialState {
  logged_user: LoggedUser | null;
  selected_user: Object;
  is_authorized: Boolean;
  loading: Boolean;
  new_user: Object;
  error: string;
  logged_out: Boolean;
}
export interface eventInitialState {
  selected_date: Date;
  your_events: Array<IEvent>;
  event_by_date: Array<IEvent> | null;
  homework: Array<IEvent>;
  submitted: Array<Homework>;
}
export interface classInitialState {
  your_classes: Array<IClass>;
  selected_class: {
    class: IClass;
    sections: Array<Section>;
    author_data?: {
      name: string;
      last_name: string;
      email: string;
    };
  };
}
export interface LoggedState {
  user: {
    logged_user: User;
    selected_user: User;
    is_authorized: Boolean;
    loading: Boolean;
    new_user: JoinData;
    error: string;
  };
}
export interface TokenError {
  message: string;
}

export interface IEvent {
  event_id?: number;
  name: string | undefined;
  type: string | undefined;
  description: string | undefined;
  startDate: string | undefined;
  graded: boolean;
  endDate: string | undefined;
  ClassClassId?: number | undefined;
  author_data?: {
    name: string
    last_name: string
    user_id: number
  }
  content?: string;
  hw_id?: number;
  grade?: number;
  class?: IClass;
}
