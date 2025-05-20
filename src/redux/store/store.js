import {configureStore} from '@reduxjs/toolkit';
import UserReducer from '../slice/UserSlice';


const store = configureStore({
  reducer: UserReducer,
});
export default store;
