import { useState, useEffect } from 'react';
import CustomCalendar from "./components/CustomCalendar";
import EventList from "./components/EventList";
import Modal from "./components/Modal";
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import EventForm from './components/EventForm';
import { useDispatch } from 'react-redux';
import { clear } from './store/event';
import defaultEvents from './defaultEvents';

const App = () => {
  //функция фильтрации событий по датам. Пока у меня массив
  const filterEvents = (newDate) => {
    const localStorageEvents = localStorage.getItem('events')

    if (!localStorageEvents) {
      localStorage.setItem('events', JSON.stringify(defaultEvents))
    }
    const events = JSON.parse(localStorageEvents);
    return events.filter(el => el.date === (newDate ?? date));
  }
  const dispatch = useDispatch();
  const [isOpenModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [date, setCurrentDate] = useState(moment(new Date()).format('DD-MM-YYYY'));
  const filterEventForDate = filterEvents();
  const [eventForDate, setEventForDate] = useState(filterEventForDate);

  useEffect(() => {
    function checkEvents() {
      const localStorageEvents = localStorage.getItem('events')

      if (!localStorageEvents) {
        localStorage.setItem('events', JSON.stringify(defaultEvents))
      }
      setEventForDate(filterEvents());
    }


    window.addEventListener('storage', checkEvents)

    return () => {
      window.removeEventListener('storage', checkEvents)
    }
  }, [])


  const handleClickAdd = () => {
    setIsEdit(false);
    setOpenModal(prevState => !prevState);
    dispatch(clear());
  }

  const handleClickEdit = () => {
    setIsEdit(true);
    setOpenModal(true);
  }


  //удалить событие
  const handleClickRemove = (guid) => {
    const localStorageEvents = localStorage.getItem('events')
    const events = JSON.parse(localStorageEvents);
    const findIndex = events.findIndex((el) => el.guid === guid);
    if (findIndex !== -1) {
      const before = events.slice(0, findIndex);
      const after = events.slice(findIndex + 1);
      const newEvents = [...before, ...after];
      localStorage.setItem('events', JSON.stringify(newEvents));
      setEventForDate(filterEvents());
    }

  }

  const handleChangeDate = (date) => {
    date = moment(date).format('DD-MM-YYYY');
    setCurrentDate(date);
    const filterEventForDate = filterEvents(date);
    setEventForDate(filterEventForDate);
  }

  //получить даты, которые нужно пометить. У них события есть
  const getMarkDates = () => {
    const events = JSON.parse(localStorage.getItem('events'));
    return [...new Set(events.map(el => el.date))];
  }


  // сохранение заметки. Тут и создание новой и обновление
  const saveEvent = (event) => {
    let events = JSON.parse(localStorage.getItem('events'));
    const guid = event.guid ?? uuidv4();
    event = { ...event, date: date, guid: guid }
    const findIndex = events.findIndex((el) => el.guid === guid);
    if (findIndex !== -1) {
      events[findIndex] = event;
    } else {
      events = [...events, event]
    }
    localStorage.setItem('events', JSON.stringify(events));
    setEventForDate(filterEvents());
  }

  const markDates = getMarkDates();


  return (
    <div className="wrapper">
      <div className="left_column">
        <CustomCalendar markDates={markDates} handleChangeDate={handleChangeDate} />
        <button className='button-add' type='button' onClick={handleClickAdd}>Добавить</button>
      </div>
      <EventList events={eventForDate} handleClickEdit={handleClickEdit} handleClickRemove={handleClickRemove} />

      <Modal
        isOpen={isOpenModal}
        title={!isEdit ? "Добавить событие" : "Редактировать событие"}
        onCloseModal={handleClickAdd}
      >
        <EventForm onCloseModal={handleClickAdd} saveEvent={saveEvent} />
      </Modal>
    </div>
  );
}

export default App;
