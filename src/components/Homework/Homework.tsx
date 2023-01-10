import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, checkTodo } from "../../reducers/tasks";

import "./Homework.scss";

const Homework: React.FC = () => {
  //HOOKS
  const dispatch = useDispatch();

  //USE STATE

  const [new_todo, setNew] = useState<Todo>();

  //USE SELECTOR
  const role = useSelector(
    (state: rootInitialState) => state.user.logged_user?.role
  );
  const hw = useSelector((state: rootInitialState) => state.events.homework);
  const events = useSelector(
    (state: rootInitialState) => state.events.your_events
  );
  const todos = useSelector((state: rootInitialState) => state.tasks.tasks);

  //FUNCTIONS

  const onChangeTodos = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(addTask(new_todo!));
      e.currentTarget.value = ""
    } else
      setNew({
        ...new_todo,
        [e.currentTarget.id]: e.currentTarget.value,
      });
  };
  
  const done = (id:string) => {
      dispatch(checkTodo(id))
  }

  //USE EFFECT
  // useEffect(() => {
  //   dispatch(retrieve_logged_action());
    
  //   if (role === "student") dispatch(get_homework_action());
  //   else dispatch(get_todo_action())
  // }, []);
  return (
    <div className="homework__wrap">
      {role === "student" ? (
        hw?.map((homework, index) => (
          <div className="homework__single">
            <input type="checkbox" id={index.toString()} />{" "}
            <label htmlFor={index.toString()}> {homework.description} </label>
          </div>
        ))
      ) : (
        <>
          {todos?.filter((t)=> !t.done).map((todo, index) => (
            <div className="homework__single" key={index}>
              <input type="checkbox" id={index.toString()} onChange={()=> done(todo.todo_id!)} />{" "}
              <label htmlFor={index.toString()}> {todo.task} </label>
            </div>
          ))}
          <input
            type="text"
            id="task"
            placeholder="Type a new task"
            //value={new_todo?.task}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
              onChangeTodos(e)
            }
          />
        </>
      )}
    </div>
  );
};

export default Homework;
