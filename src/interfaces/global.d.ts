interface Action {
  type: string;
  payload?: string | Object;
}
interface SelectOption {
  value: string;
  label: string;
}

interface rootInitialState {
  user: initialState;
  file: FileInitialState;
  events: eventInitialState;
  classes: classInitialState;
  tasks: {
    tasks: Array<Todo>;
  };
}

interface initialState {
  logged_user: LoggedUser | null;
  selected_user: Object;
  is_authorized: Boolean;
  loading: Boolean;
  new_user: Object;
  error: string;
  logged_out: Boolean;
}


interface LoggedState {
  user: {
    logged_user: User;
    selected_user: User;
    is_authorized: Boolean;
    loading: Boolean;
    new_user: JoinData;
    error: string;
  };
}
interface TokenError {
  message: string;
}

