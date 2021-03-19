import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Cal.scss"

const Cal:React.FC = () => {
  //STATE
  const [value, onChange] = useState<Date|Date[]|null>(null);

  return (
      <Calendar
        onChange={onChange}
        value={value}
      />
  );
}

export default Cal