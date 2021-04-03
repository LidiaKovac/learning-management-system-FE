import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieve_logged_action } from "../../actions/login_actions";
import {
  search_class,
} from "../../api calls/class_api";
import { rootInitialState } from "../../interfaces/interfaces";
import { IClass } from "../../interfaces/ClassInterfaces";
import { get_enrolled_action } from "../../actions/class_actions";
import { useHistory } from "react-router";
import { Menu } from "../../components/Menu/Menu";
import "./Classes.scss";
import { Single } from "../../components/SingleCourse/Single";
const Classes = () => {
  //HOOKS
  const dispatch = useDispatch();
  const history = useHistory();

  //USE SELECTOR
  const logged = useSelector(
    (state: rootInitialState) => state.user.logged_user
  );
  const enrolled = useSelector(
    (state: rootInitialState) => state.classes.your_classes
  );

  //USE STATE
  const [query, setQuery] = useState<String>("");
  const [new_class, buildNew] = useState<IClass>();
  const [result, setResult] = useState<Array<any>>();

  //USE EFFECT

  useEffect(() => {
    dispatch(retrieve_logged_action());
    if (!logged) history.push("/");
    dispatch(get_enrolled_action());
  }, []);

  //FUNCTIONS
  const submit_query = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const result = await search_class(e.currentTarget.value);
      if (result) setResult(result);
    }
  };

  return (
    <>
      <div className="classes__wrap">
        <div className="dashboard__menu">
          <Menu />
        </div>
        <div className="classes__content">
          <input
            placeholder="Search"
            type="search__classes"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.currentTarget.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              submit_query(e)
            }
          />
          {result ? (
            <>
              {result?.map((class_s) => {
                return <Single c={class_s} key={class_s.class_id} />;
              })}{" "}
            </>
          ) : (
            <div className="">
              {enrolled.map((en) => (
                <div onClick={() => history.push(`/class/${en.class_id}`)}>
                  {" "}
                  <Single c={en} key={en.class_id} />{" "}
                </div>
              ))}{" "}
            </div>
          )}
        </div>
      </div>

      {/* {logged?.role === "teacher" ?
    //TEACHER VIEW 
    <>
        <div className="create-new">Create a new class</div>
        <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=> onChangeHandler(e)} id='name'/>
        <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=> onChangeHandler(e)} id='description'/>
        <button onClick={()=>create_new_course(new_class)}>CREATE</button>
    </>
    //STUDENT VIEW 
    : <div className="">
     <h2>YOUR CLASSES</h2> 
      <br/>
      {enrolled.map((class_s)=> <div style={{background: "cyan", margin: "5px"}} onClick={()=>{
        setShow(!show)
        setSelected(class_s)}}>
        {class_s.name}
        <br/>
        <small>{class_s.description}</small>
      </div>)}
      {show && <div className="">
        <textarea placeholder='do you homeworks here' value={homework.content} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=> setHomework({...homework, content: e.currentTarget.value})}></textarea>
        <button onClick={()=> create_hw(selected!.class_id!, homework)}>Submit</button>
        </div>}
    </div>
    } */}
    </>
  );
};

export default Classes;
