import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import App from './App';

import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store } from './Redux/Store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();