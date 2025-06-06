import './sass/index.sass';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import router from './routes/Router.tsx';
import store, { persistor } from './store/store.ts';
import { PersistGate } from 'redux-persist/lib/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
