import reactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';

reactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector('.root')
);
