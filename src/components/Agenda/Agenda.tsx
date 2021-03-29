import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_by_date_action,
  get_scheduled_action,
} from "../../actions/events_actions";
import { rootInitialState } from "../../interfaces/interfaces";
import "./Agenda.scss";

const Agenda: React.FC = () => {
  const dispatch = useDispatch();
  const [start, setStart] = useState(0);
  const [offset, setOffset] = useState(3);
  const selected_date = useSelector(
    (state: rootInitialState) => state.events.selected_date
  );
  const events_by_date = useSelector(
    (state: rootInitialState) => state.events.event_by_date
  );
  useEffect(() => {
    dispatch(get_scheduled_action());
  }, []);
  useEffect(() => {
    dispatch(get_by_date_action(selected_date));
    console.log(events_by_date);
  }, [selected_date]);
  return (
    <div className="agenda__wrap">
      <span>Your events: </span>
      {events_by_date && events_by_date.length > 0
        ? events_by_date?.slice(start, offset).map((ev) => (
            <div className="agenda__single bg">
              <div className="agenda__title">
				  {ev.name}
			  </div>
			  <div className="agenda__description">
				  {ev.description}
			  </div>
              <div className="agenda__time">
                Start: {ev.startDate?.split(":")[0]},
                {ev.startDate?.split(" ")[1].split("+")[0]}
              </div>
			  <div className="agenda__time">
                End: {ev.endDate?.split(":")[0]},
                {ev.endDate?.split(" ")[1].split("+")[0]}
              </div>
            </div>
          ))
        : "There are no events for this date."}
    </div>
  );
};

export default Agenda;
