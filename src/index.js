import "./firebase"; // înainte de App
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // 👉 adaugă această linie

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* 👉 învelește aplicația */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
