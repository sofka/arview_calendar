import eventTypes from '../../eventTypes';
import s from './style.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { guidData, nameData, moneyData, timeData, addressData, remarkData, typeData, setName, setMoney, setAddress, setTime, setRemark, setType } from '../../store/event';
const EventForm = ({ onCloseModal, saveEvent }) => {
    const guid = useSelector(guidData);
    const name = useSelector(nameData);
    const type = useSelector(typeData);
    const money = useSelector(moneyData);
    const address = useSelector(addressData);
    const time = useSelector(timeData);
    const remark = useSelector(remarkData);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        saveEvent({ guid, name, money, address, time, remark, type });
        onCloseModal && onCloseModal(true);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>Название события</div>
                <input
                    placeholder="Введите название события"
                    value={name}
                    onChange={(e) => {
                        dispatch(setName(e.target.value));
                    }}
                    required
                />
            </div>
            <div>
                <div>Тип события</div>
                <select onChange={(e) => dispatch(setType(e.target.value))} value={type}>
                    <option value={eventTypes.holiday}  >Праздничные дни</option>
                    <option value={eventTypes.event} >Мероприятия</option>
                    <option value={eventTypes.remark} >Пометки</option>
                </select>
            </div>
            <div className={cn(s.hidden_block, { [s.visible]: type === eventTypes.holiday })}>
                <div>Сумма денег</div>
                <input
                    placeholder="Введите сумму, которую планируете потратить"
                    required={type === eventTypes.holiday}
                    name="money"
                    value={money}
                    onChange={(e) => {
                        dispatch(setMoney(e.target.value));
                    }}
                />
            </div>
            <div className={cn(s.hidden_block, { [s.visible]: type === eventTypes.event })}>
                <div>Куда идти</div>
                <input placeholder="Введите адрес"
                    required={type === eventTypes.event}
                    name="address"
                    value={address}
                    onChange={(e) => {
                        dispatch(setAddress(e.target.value));
                    }}
                />
                <div>Во сколько</div>
                <input
                    placeholder="Введите время"
                    required={type === eventTypes.event}
                    name="time"
                    value={time}
                    onChange={(e) => {
                        dispatch(setTime(e.target.value));
                    }}
                />
            </div>

            <div className={cn(s.hidden_block, { [s.visible]: type === eventTypes.remark })} >
                <textarea
                    required={type === eventTypes.remark}
                    value={remark}
                    onChange={(e) => {
                        dispatch(setRemark(e.target.value));
                    }}
                />
            </div>
            <div className={s.right_group_button}>
                <button type='button' onClick={() => onCloseModal && onCloseModal(true)} > Закрыть </button>
                <button type='submit'> Сохранить </button>
            </div>
        </form>
    )
}
export default EventForm;
