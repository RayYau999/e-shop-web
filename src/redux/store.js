import { configureStore, combineReducers} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from './counterSlice'
import cartSlice from '../state/cartSlice'
import jwtSlice from "../state/jwtSlice.tsx";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // Only persist the cart state
  // blacklist: ['counter'], // Alternatively, you can use blacklist to exclude specific states
};

const rootReducer = combineReducers({
  counter: counterReducer,
  cart: cartSlice,
  jwt: jwtSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({ reducer: persistedReducer })

console.log(store.getState())

export const persistor = persistStore(store);
export default store;