import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import App from './App';
import {setupStore} from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={setupStore({})}>
        <App/>
    </Provider>
);

