import { configureStore } from '@reduxjs/toolkit';

import authSlice from './features/authSlice';
import sessionStorage from 'redux-persist/es/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import favoriteSlice from './features/favoriteSlice';

const authReducer = persistReducer(
  { key: 'user', storage: sessionStorage },
  authSlice,
);
const favoritesReducer = persistReducer(
  { key: 'favorites', storage: sessionStorage },
  favoriteSlice,
);
const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
