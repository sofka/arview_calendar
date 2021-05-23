import 'font-awesome/css/font-awesome.min.css';
import cn from 'classnames';
import s from './style.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEvent } from '../../store/event';

const EventItem = ({ guid, name, money = null, address = null, time = null, remark = null, type, onEventEdit }) => {

    const [hover, setHover] = useState(false);
    const dispatch = useDispatch();
    const handleOnClick = () => {
        dispatch(setEvent({ guid, name, money, address, time, remark, type }));
        onEventEdit();
    }

    return (

        <li onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} >
            <div>
                <span className={s.header}>{name}</span>
                <span className={cn(s.button, { [s.display]: hover })} title='Удалить'><i className="fa fa-trash" ></i></span>
                <span className={cn(s.button, { [s.display]: hover })} title='Редактировать' ><i className="fa fa-pencil" onClick={handleOnClick} ></i></span>
            </div>
            {money && <div>Бюджет: {money}</div>}
            {address && <div>Адрес: {address}</div>}
            
            {time && <div>Время: {time}</div>}
            {remark && <div> {remark}</div>}

        </li>
    )
}

export default EventItem;