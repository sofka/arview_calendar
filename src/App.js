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
  const dispatch = useDispatch();
  const [isOpenModal, setOpenModal] = useState(false);
  const [date, setCurrentDate] = useState(moment(new Date()).format('DD-MM-YYYY'));
  useEffect(() => {
    function checkUserData() {
      const localStorageEvents = localStorage.getItem('events')

      if (!localStorageEvents) {
        localStorage.setItem('events', JSON.stringify(defaultEvents))
      }
      setEventForDate(filterEvents());
    }

    window.addEventListener('storage', checkUserData)

    return () => {
      window.removeEventListener('storage', checkUserData)
    }
  }, [])



  const handleClickAdd = () => {
    setOpenModal(prevState => !prevState);
    dispatch(clear());
  }

  const handleClickEdit = () => {
    setOpenModal(true);
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

  //функция фильтрации событий по датам. Пока у меня массив
  const filterEvents = (newDate) => {
    const events = JSON.parse(localStorage.getItem('events'));
    return events.filter(el => el.date === (newDate ?? date));
  }

  const saveEvent = (event) => {
    let events = JSON.parse(localStorage.getItem('events'));
    const guid = event.guid ?? uuidv4();
    event = { ...event, date: date, guid: guid }
    console.log(guid);
    const findIndex = events.findIndex((el) => el.guid === guid);
    if (findIndex !== -1) {
      events[findIndex] = event;
    } else {
      events = [...events, event]
    }
    localStorage.setItem('events', JSON.stringify(events));
    setEventForDate(filterEvents());
  }

  const filterEventForDate = filterEvents();
  const markDates = getMarkDates();
  const [eventForDate, setEventForDate] = useState(filterEventForDate);


  return (
    <div className="wrapper">
      <CustomCalendar markDates={markDates} handleChangeDate={handleChangeDate} />
      <EventList events={eventForDate} handleClickEdit={handleClickEdit} />
      <button className='button-add' type='button' onClick={handleClickAdd}>Добавить</button>

      <Modal
        isOpen={isOpenModal}
        title="Добавить событие"
        onCloseModal={handleClickAdd}
      >
        <EventForm onCloseModal={handleClickAdd} saveEvent={saveEvent} />
      </Modal>
    </div>
  );
}

export default App;
