import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../../reducers/events';
import "./Cal.scss"

const Cal = () => {
  //STATE
  const [value, onChange] = useState<Date | [Date | null, Date | null] | null | undefined>(new Date());

  //HOOKS
  const dispatch = useDispatch()

  //USE EFFECT
  useEffect(()=> {
    dispatch(setSelectedDate(value as Date))
  }, [value])

  return (
      <Calendar
        onChange={onChange}
        value={value}
      />
  );
}

export default Cal