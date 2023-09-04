import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Mainpage from './Mainpage';
import reportWebVitals from './reportWebVitals';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Topic from './Topic';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* <SignIn /> */}
    {/* <SignUp /> */}
    {/* <Profile /> */}
    {/* <EditProfile /> */}
    <Topic/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
