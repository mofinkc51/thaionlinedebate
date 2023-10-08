import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignIn from './pages/signin-page/SignIn';
import SignUp from './pages/signup-page/SignUp';
import Profile from './pages/profile-page/Profile';
import Home from './pages/home-page/home';
import CreateTopicPopup from './components/CreateTopicPopup';
import FavDebateGallery from './pages/fav-debate-gallery/FavDebateGallery';
import DebateTopic from './pages/debate-topic-page/DebateTopic';
import EditTopicPopup from './components/topic-popup/EditTopicPopup';
// import AddAgreeComment from './components/topic-popup/AddAgreeComment';
// import AddDisagreeComment from './components/topic-popup/AddDisagreeComment';
import DeleteTopicPopup from './components/topic-popup/DeleteTopicPopup';
import DownloadList from './pages/download-list-page/DownloadList';
import DownloadRequestList from './pages/dataset-download-list/DownloadRequestList';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <AuthContextProvider>
      <App/>
    </AuthContextProvider> */}
    {/* <FavDebateGallery/> */}
    {/* <SignIn/> */}
    {/* <SignUp/> */}
    {/* <Home/> */}
    {/* <CreateTopicPopup/> */}
    {/* <Profile/> */}
    {/* <DebateTopic/> */}
    {/* <AddAgreeComment/> */}
    {/* <AddDisagreeComment/> */}
    {/* <EditTopicPopup/> */}
    {/* <DeleteTopicPopup/> */}
    {/* <DownloadList/> */}
    <DownloadRequestList/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
