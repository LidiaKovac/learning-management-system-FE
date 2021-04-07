import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { get_enrolled_action } from "../../actions/class_actions";
import { get_homework_action } from "../../actions/events_actions";
import AsyncSelect from "react-select";
import { retrieve_logged_action } from "../../actions/login_actions";
import { TeacherMenu, Menu } from "../../components/Menu/Menu";
import { IEvent, rootInitialState, SelectOption } from "../../interfaces/interfaces";
import "../Dashboard/Dashboard.scss";
import "./Homeworkpage.scss";
import { get_enrolled } from "../../api calls/class_api";
import { IClass, SelectClass } from "../../interfaces/ClassInterfaces";

const HWPage = () => {
  //HOOKS
  const dispatch = useDispatch();
  const history = useHistory();
  //SELECTORS
  const logged = useSelector((state: rootInitialState) => state.user);
  const homework = useSelector(
    (state: rootInitialState) => state.events.homework
  );
  
  const enrolled = useSelector(
    (state: rootInitialState) => state.classes.your_classes
  );
  //USE STATE

  const [options, setOptions] = useState<Array<SelectClass>>([]);
  const [selected, setClass] = useState<SelectClass | null>();
  const [hw, setHw] = useState<IEvent[]>()

  //USE EFFECT

  useEffect(() => {
    dispatch(retrieve_logged_action());
    if (!logged.logged_user?.name) history.push("/")
    dispatch(get_homework_action());
    if (homework instanceof Array) {
      dispatch(get_enrolled_action());
      retrieveOptions();
      
    } else history.push("/");
    if (logged.error === "Session has expired, please login again.")
      history.push("/");
  }, []);

  useEffect(()=> {
    const hw_F = homework.filter((h)=> h.class!.class_id === selected?.value)
    setHw([...hw_F])
  }, [selected])

  //FN

  const retrieveOptions = async () => {
    console.log(enrolled);
    let options = [];
    for (let i = 0; i < enrolled.length; i++) {
      const opt = new SelectClass(enrolled[i].name!, enrolled[i].class_id!);
      options.push(opt);
      console.log(options);
    }
    setOptions(options);
  };
  return (
    <div className="dashboard__wrap">
      <div className="dashboard__menu">
        {logged?.logged_user?.role === "student" ? <Menu /> : <TeacherMenu />}
      </div>
      <div className="hw-page__main">
        <h2 className="header">Homeworks</h2>
        <h3>Select a class</h3>
        <AsyncSelect
          options={options ?? []}
          id="ClassClassId"
          isSearchable={false}
          defaultOptions
          className="agenda__select"
          classNamePrefix="agenda__select"
          onChange={(val: SelectClass | null) => setClass(val)}
        />
        <div className="hw-page__content">
          <ol>
          {hw?.length! > 0 ? hw?.map((h) => (
              <li className="hw-page__single" key={h.class?.class_id}>
                <div>
                  <span>
                    <strong>Requirements: </strong>
                    {h.name}
                  </span>
                  <span>
                    <strong>Details: </strong>
                    {h.description}
                  </span>
                  <span>
                    <strong>Graded: </strong>
                    {h.graded ? "YES" : "NO"}
                  </span>
                  <span>
                    <strong>Due: </strong> {h.endDate?.split("T")[0]}, h. {h.endDate?.split("T")[1]}
                  </span>
                  <button> Submit </button>
                </div>
              </li>
            )) : "No homework yet!"}
            </ol>
        </div>
      </div>
    </div>
  );
};

export default HWPage;
