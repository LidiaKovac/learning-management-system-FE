import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import AsyncSelect from "react-select";
import { add_event_action } from "../../actions/events_actions";
import { get_created_classes } from "../../api calls/class_api";
import { ResClass, SelectClass } from "../../interfaces/ClassInterfaces";
import {
  IEvent,
  rootInitialState,
  SelectOption,
} from "../../interfaces/interfaces";
import Spinner from "../Loader/Loader";
import "./EventBuilder.scss"
const EventBuilder = () => {
  //HOOKS
  const history = useHistory();
  const dispatch = useDispatch();

  //USE STATE
  const [option_class, setOptionClass] = useState<Array<SelectClass>>([]);
  const [event, setEvent] = useState<IEvent>({
    name: "",
    type: "",
    description: "",
    startDate: "",
    endDate: "",
    graded: false,
    ClassClassId: undefined,
  });

  //USE SELECTOR
  const loading = useSelector((state: rootInitialState) => state.user.loading);

  //USE EFFECT 

  useEffect(() => {
    retrieveOptions();
  }, []);

  //CONSTANTS 

  const options = [
    { value: "homework", label: "Homework" },
    { value: "exam", label: "Exam" },
  ];

  //FUNCTIONS 
  const retrieveOptions = async () => {
    const opt = await get_created_classes();
    if (opt === { message: "jwt expired" }) {
      history.push("/");
    } else {
      if (opt !== 204) {
        opt?.forEach((o: ResClass) => {
          const new_class = new SelectClass(o.name, o.class_id);
          setOptionClass([...option_class, new_class]);
        });
      }
    }
  };
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEvent({
      ...event,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  const onChangeHandler__type = (val: SelectOption | null) => {
    setEvent({
      ...event,
      type: val?.value,
    });
  };
  const onChangeHandler__class = (val: SelectClass | null) => {
    setEvent({
      ...event,
      ClassClassId: val!.value,
    });
  };

  return (
    <div className="agenda__add">
      <input
        type="text"
        id="name"
        value={event.name}
        placeholder="Name of the event"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeHandler(e)
        }
      />
      <AsyncSelect
        options={options}
        id="type"
        isSearchable={false}
        defaultOptions
        className="agenda__select"
        classNamePrefix="agenda__select"
        onChange={(val: SelectOption | null) => onChangeHandler__type(val)}
      />
      <textarea
        placeholder="Brief description"
        value={event.description}
        id="description"
        rows={4}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChangeHandler(e)
        }
      />
      <span className='graded-input'>

      <input type ='checkbox' id='check' onChange={()=> setEvent({
        ...event,
        graded: !event.graded
      })}/> 
      <label htmlFor='check'>Graded?</label>
      </span>
      <AsyncSelect
        options={option_class}
        id="ClassClassId"
        isSearchable={false}
        defaultOptions
        className="agenda__select"
        classNamePrefix="agenda__select"
        onChange={(val: SelectClass | null) => onChangeHandler__class(val)}
      />
      <div className="agenda__dates">
        <input
          type="datetime-local"
          id="startDate"
          value={event.startDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeHandler(e)
          }
        />
        <input
          type="datetime-local"
          id="endDate"
          value={event.endDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeHandler(e)
          }
        />
      </div>

      <button
        className="submit"
        onClick={() => {
          dispatch(add_event_action(event!));
          setEvent({
            name: "",
            type: event.type,
            description: "",
            startDate: "",
            endDate: "",
            graded: false,
            ClassClassId: event.ClassClassId,
          });
        }}
      >
        {!loading ? "Submit event" : <Spinner />}
      </button>
    </div>
  );
};

export default EventBuilder;
