import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from './Components/Home/ScrollToTop';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ScrollToTop/>  
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
