import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import store from './app/store';
import { Provider } from 'react-redux';
import  App  from './app'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

