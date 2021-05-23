import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './event';

export default configureStore({
    reducer: {
        event: eventReducer
    }
})