import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieve_logged_action } from "../../actions/login_actions";
import { create_new_course, enroll, search_class } from "../../api calls/class_api";
import { rootInitialState } from "../../interfaces/interfaces";

const Classes = () => {
    interface IClass {
        name?: string | undefined
        description?: string | undefined
    }
const dispatch = useDispatch()
const logged = useSelector((state:rootInitialState)=> state.user.logged_user)
  const [query, setQuery] = useState<String>("");
  const [new_class, buildNew] = useState<IClass>()
  const [result, setResult] = useState<Array<any>>()
  const submit_query = async(e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const result = await search_class(e.currentTarget.value);
      if (result) setResult(result)
    }
  };
  useEffect(()=> {
    dispatch(retrieve_logged_action())
  }, [])
  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    buildNew({
        ...new_class,
        [e.currentTarget.id]: e.currentTarget.value
    })
    console.log(new_class)
  }
  return (
    <>
      <input
        type="search__classes"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.currentTarget.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          submit_query(e)
        }
      />
        {result?.map((class_s)=> <div onClick={()=> enroll(class_s.class_id)}>{class_s.name}</div>)}
    {logged!.role === "teacher" &&
    <>
        <div className="create-new">Create a new class</div>
        <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=> onChangeHandler(e)} id='name'/>
        <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=> onChangeHandler(e)} id='description'/>
        <button onClick={()=>create_new_course(new_class)}>CREATE</button>
        </>
    }
    </>
  );
};

export default Classes;
