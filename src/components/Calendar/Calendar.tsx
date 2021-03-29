import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch } from 'react-redux';
import { SELECT_DATE } from '../../actions/action_types';
import "./Cal.scss"

const Cal:React.FC = () => {
  //STATE
  const [value, onChange] = useState<Date|Date[]|null>(null);
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch({type: SELECT_DATE, payload: value})
  }, [value])

  return (
      <Calendar
        onChange={onChange}
        value={value}
      />
  );
}

export default Cal