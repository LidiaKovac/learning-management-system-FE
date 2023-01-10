import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import AsyncSelect from "react-select";
import MDEditor from "@uiw/react-md-editor"
import { TeacherMenu, Menu } from "../../components/Menu/Menu";
import "../Dashboard/Dashboard.scss";
import "./Homeworkpage.scss";
import { get_enrolled } from "../../api calls/class_api";
import { create_hw } from "../../api calls/homework_api";
import moment from "moment";

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
  const [editor, showEditor] = useState<boolean>(false)
  const [value, setValue] = useState<string | undefined>()
  const [hw, setHw] = useState<IEvent[]>()
  const [selected_hw, setSelectedHW] = useState<string | undefined>(undefined)

  //USE EFFECT

  // useEffect(() => {
  //   dispatch(retrieve_logged_action());
  //   if (!logged.logged_user?.name) history.push("/")
  //   dispatch(get_homework_action());
  //   if (homework instanceof Array) {
  //     dispatch(get_enrolled_action());
  //     retrieveOptions();
      
  //   } else history.push("/");
  //   if (logged.error === "Session has expired, please login again.")
  //     history.push("/");
  // }, []);

  useEffect(()=> {
    const hw_F = homework.filter((h)=> h.class!.class_id === selected?.value)
    setHw([...hw_F])
  }, [selected])

  //FN

  const retrieveOptions = async () => {
    
    let options = [];
    for (let i = 0; i < enrolled.length; i++) {
      const opt = new SelectClass(enrolled[i].name!, enrolled[i].class_id!);
      options.push(opt);
      
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
          // defaultOptions
          className="agenda__select"
          classNamePrefix="agenda__select"
          onChange={(val: SelectClass | null) => setClass(val)}
        />
        <div className="hw-page__content">
          <div className='hw-page__list'>
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
                    <strong>Due: </strong> {moment(h.endDate).format("HH:mm")}
                  </span>
                  <button onClick={()=>{
                    setSelectedHW(h.event_id)
                    showEditor(!editor)}}> {!editor ? "Write" : "Close editor (lose progress)"} </button>
                </div>
              </li>
            )) : "No homework yet!"}
            </ol>
            </div>
            <div className='hw-page__editor'>
            <MDEditor
					value={value ?? "Type here"}
					onChange={(content: string | undefined) => setValue(content)}
					//onFocus={() => setValue("")}
					className={editor ? "type__editor" : "display-hidden"}
				/>
        {editor && <button onClick={()=>create_hw(selected_hw!, value!)} style={{width: "250px"}}>Submit <b style={{color: "red"}}>CAN'T BE UNDONE</b></button>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HWPage;
