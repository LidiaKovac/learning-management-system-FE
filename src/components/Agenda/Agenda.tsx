import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../reducers/events";

import "./Agenda.scss";

const Agenda: React.FC = () => {
  //HOOKS
  const dispatch = useDispatch();

  //USE STATE
  const [start, setStart] = useState(0);
  const [offset, setOffset] = useState(3);

  //USE SELECTOR
  const selected_date = useSelector((state: rootInitialState) => state.events.selected_date);
  const events_by_date = useSelector((state: rootInitialState) => state.events.event_by_date);

  //USE EFFECT
  // useEffect(() => {
  //   dispatch((selected_date));
  // }, []);
  useEffect(() => {
    dispatch(setSelectedDate(selected_date));
  }, [selected_date]);

  return (
    <div className="agenda__wrap">
      <span>Your events: </span>
      {events_by_date && events_by_date.length > 0
        ? events_by_date
            ?.filter((ev) => ev.type !== "homework")
            .slice(start, offset)
            .map((ev, index) => (
              <div className="agenda__single bg" key={index}>
                <div className="agenda__title">{ev.name}</div>
                <div className="agenda__description">{ev.description}</div>
                <div className="agenda__time">
                  Start: {moment(ev.startDate).format("DD/MM")}, at {moment(ev.startDate).format("HH:mm")}
                </div>
                <div className="agenda__time">
                  End: {moment(ev.endDate).format("DD/MM")}, at {moment(ev.endDate).format("HH:mm")}
                </div>
              </div>
            ))
        : "There are no events for this date."}
    </div>
  );
};

export default Agenda;
