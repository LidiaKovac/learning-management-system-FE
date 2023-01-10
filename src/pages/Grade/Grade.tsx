import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Menu, TeacherMenu } from "../../components/Menu/Menu";
import "./index.scss";

const Grade = () => {
    const [grade, setGrade] = useState<number>()
  const dispatch = useDispatch();
  const logged = useSelector((state: rootInitialState) => state.user);
  const homework = useSelector(
    (state: rootInitialState) => state.events.homework
  );
  // useEffect(() => {
  //   dispatch(retrieve_logged_action());
  //   dispatch(get_homework_teacher_action());
  // }, []);
  return (
    <div className="dashboard__wrap">
      <div className="dashboard__menu">
        {logged?.logged_user?.role === "student" ? <Menu /> : <TeacherMenu />}
      </div>
      <div className="grade__main">
        {homework?.map((h) => (
          <div className="grade__single">
            <div className="grade__name">
              {h.author_data?.name} {h.author_data?.last_name} - {h.class?.name}
            </div>
            <details>
              <summary>See homework</summary>
              <span>

              {h.content}
              </span>
              <br/>
              <span>
              <input disabled={h.grade ? true : false} type='number' placeholder={h.grade?.toString() || 'Grade'} min={0} max={10} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setGrade(parseInt(e.currentTarget.value)) }/>
              <button disabled={h.grade ? true : false} /* onClick={()=> dispatch(grade_action(h.hw_id!, grade!))}*/ >{h.grade ? "Already graded":"Submit"}</button>
              </span>
            </details>

            <div className="grade__cont"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Grade;
