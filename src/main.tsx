import React from 'react'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App'
import history from './history';
import './index.css'
import { injectStore } from './slices/auth/auth.service';
import store from './store';

injectStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
