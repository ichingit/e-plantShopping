import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartReducer from './CartSlice';
 const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
export default store
