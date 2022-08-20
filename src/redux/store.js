import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //
import { contactsSlice } from './contactsSlice';
import { filterSlice } from './filterSlice';

const contactsPersistConfig = {
  key: 'phonebook',
  storage,
  whitelist: ['contactList'], // navigation will not be persisted
};
const rootReducer = combineReducers({
  contactList: contactsSlice.reducer,
  filter: filterSlice.reducer,
});

const persistedReducer = persistReducer(contactsPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
