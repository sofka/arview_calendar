import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import s from './style.module.css';
import { useState } from 'react';

const CustomCalendar = ({ markDates, handleChangeDate }) => {
    const [value, setValue] = useState(new Date());
    const onHandleChangeDate = (date) => {
        setValue(date);
        handleChangeDate(date);
    }
    return (
        <Calendar className={s.custom_calendar}
            onChange={onHandleChangeDate}
            value={value}
            tileClassName={({ date, view }) => {
                if (markDates.find(x => x === moment(date).format('DD-MM-YYYY'))) {
                    return s.highlight
                }
            }}

        />
    )
}

export default CustomCalendar;