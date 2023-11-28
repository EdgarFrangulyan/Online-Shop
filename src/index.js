import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/assets/style/style/style.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './store/reducers/index';


const store = configureStore({
    reducer,
})

window.store = store;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


reportWebVitals();
