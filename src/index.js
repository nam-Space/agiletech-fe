import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from 'utils/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
      <ToastContainer />
    </UserProvider>
  </React.StrictMode>
);