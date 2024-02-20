import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import reportWebVitals from "./reportWebVitals";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/<Synonym-Game>/">
    <App />
  </BrowserRouter> 
);
reportWebVitals();
