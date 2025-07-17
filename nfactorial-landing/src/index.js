import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';         // /game
import App1 from './App1';       // /
import Anketa from './Anketa';   // /anketa

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App1 />} />
        <Route path="/anketa" element={<Anketa />} />
        <Route path="/game" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
