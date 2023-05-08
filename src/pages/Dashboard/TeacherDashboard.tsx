import "./Dashboard.scss";

import Graph from "../../assets/graph.png";

import Waving from "../../assets/waving.png";
import Tick from "../../assets/tick.png";
import Notebook from "../../assets/notebook.png";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

//import GradeSummary from "../../components/GradeSummary/GradeSummary"
import Agenda from "../../components/Agenda/Agenda";
import Cal from "../../components/Calendar/Calendar";
import Todo from "../../components/Homework/Homework";
//import RecentNotes from "../../components/RecentNotes/RecentNotes"
import { TeacherMenu } from "../../components/Menu/Menu";
import EventBuilder from "../../components/EventBuilder/EventBuilder";
import { ComingSoon } from "../../components/ComingSoon/ComingSoon";
import { get_submitted_hw } from "../../api calls/event_api";
import RecentNotes from "../../components/RecentNotes/RecentNotes";

const TeacherDashboard: React.FC = () => {
  //STATE
  const [createMode, setCreateMode] = useState<Boolean>(false);
  //HOOKS
  const dispatch = useDispatch();
  const history = useNavigate();
  const logged_user = useSelector(
    (state: LoggedState) => state.user.logged_user
  );
  const is_auth = useSelector((state: LoggedState) => state.user.is_authorized);
  const submitted_hw = useSelector((state:rootInitialState)=> state.events.submitted)

  //USEFFECTS
  // useEffect(() => {
  //   if (!is_auth) {
  //     history("/");
  //   }
  //   if (logged_user.name === undefined) {
  //     dispatch(retrieve_logged_action());
  //   }
  //   dispatch(get_submitted_hw_action());
  // }, []);

  return (
    <div className="dashboard__wrap">
      <div className="dashboard__menu">
        <TeacherMenu />
      </div>
      <div className="dashboard__main">
        <div className="dashboard__content">
          <div className="dashboard__header">
            <img src={Waving} className="waving" alt="waving" />
            <span>Hello {logged_user.name}!</span>
          </div>
          <div className="dashboard__quote">
            "Education is the most powerful weapon you can use to change the
            world."
          </div>
          <div className="dashboard__quick-tab">
            <div className="dashboard__graph">
              <span className="graph__header">
                <img src={Graph} alt="graph" className="icon" /> Grades
              </span>
              {/* <GradeSummary/> */}
              <ComingSoon />
            </div>
            <div className="dashboard__todos">
              <span className="todo__header">
                <img src={Tick} alt="tick" className="icon" /> To do list
              </span>
              <Todo />
            </div>
          </div>
          <div className="dashboard__recent">
            <div className="recent__header">
              <img
                src={Notebook}
                alt="recent"
                className="icon"
                style={{ marginRight: "10px" }}
              />{" "}
              Recently submitted homework
            </div>
            <div className="recent__content">
              {/* <ComingSoon /> */}
              {submitted_hw?.reverse().slice(0,3).map((f, index)=>
                            
                            <RecentNotes homework={f as Homework} key={index} />
                        
                    )}
            </div>
          </div>
        </div>
        <div className="dashboard__agenda">
          <div className="add-see" onClick={() => setCreateMode(!createMode)}>
            Add an event / See events
          </div>
          {!createMode ? (
            <>
              <Cal />
              <Agenda />
            </>
          ) : (
            <EventBuilder />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
