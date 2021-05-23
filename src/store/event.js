import { createSlice } from '@reduxjs/toolkit';
import eventTypes from '../eventTypes';
import moment from 'moment';

export const slice = createSlice({
    name: 'event',
    initialState: {
        guid: '',
        name: '',
        date: moment(new Date()).format('DD-MM-YYYY'),
        money: '',
        address: '',
        time: '',
        remark: '',
        type: eventTypes.remark
    },
    reducers: {
        clear: (state, action) => ({
            guid: null,
            name: '',
            date: moment(new Date()).format('DD-MM-YYYY'),
            money: '',
            address: '',
            time: '',
            remark: '',
            type: eventTypes.remark
        }),
        setEvent: (state, action) => ({
            ...action.payload
        }),
        setGuid: (state, action) => ({
            ...state,
            guid: action.payload
        }),
        setName: (state, action) => ({
            ...state,
            name: action.payload
        }),
        setMoney: (state, action) => ({
            ...state,
            money: action.payload
        }),
        setAddress: (state, action) => ({
            ...state,
            address: action.payload
        }),
        setTime: (state, action) => ({
            ...state,
            time: action.payload
        }),
        setRemark: (state, action) => ({
            ...state,
            remark: action.payload
        }),
        setType: (state, action) => ({
            ...state,
            type: action.payload
        }),

    }
});
export const { clear, setEvent, setName, setMoney, setAddress, setTime, setRemark, setType } = slice.actions;
export const guidData = state => state.event.guid;
export const nameData = state => state.event.name;
export const datedData = state => state.event.date;
export const moneyData = state => state.event.money;
export const addressData = state => state.event.address;
export const timeData = state => state.event.time;
export const remarkData = state => state.event.remark;
export const typeData = state => state.event.type;


export default slice.reducer;
