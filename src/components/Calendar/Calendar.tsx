import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Cal.scss"

const Cal = () => {

  const [value, onChange] = useState<Date|Date[]|null>(null);

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default Cal