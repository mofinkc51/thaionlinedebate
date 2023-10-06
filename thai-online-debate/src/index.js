import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DebateTopic from './pages/debate-topic-page/DebateTopic';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <AuthContextProvider>
      <App/>
    </AuthContextProvider> */}
    <DebateTopic/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
