// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice'; // If you have a user reducer

const store = configureStore({
  reducer: {
    userState: userReducer, // If you have a user reducer
  },
});

export default store;
