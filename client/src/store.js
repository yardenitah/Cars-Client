import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import {thunk} from 'redux-thunk';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Apply thunk middleware
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools in development mode
});

export default store;