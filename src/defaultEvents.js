
import eventTypes from './eventTypes';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const defaultEvents = [
    {
      guid: uuidv4(),
      date: '04-05-2021',
      name: 'День рождение собаки',
      money: '300$',
      type: eventTypes.holiday
    },
    {
      guid: uuidv4(),
      date: '04-05-2021',
      name: 'Пьянка у соседа',
      address: '309кв',
      time: '13:59',
      type: eventTypes.event
    },
    {
      guid: uuidv4(),
      date: moment(new Date()).format('DD-MM-YYYY'),
      name: 'Заметочка',
      remark: 'По дороге домой после работы купить хлеба',
      type: eventTypes.remark
    },
  ];
export default defaultEvents;