import logo from './logo.svg';
import React, { useContext } from "react";
import './App.css';
import UserNavBar from './components/Navbar/UserNavBar';
import RegisterNavbar from './components/Navbar/RegisterNavbar';
import SignInNavbar from './components/Navbar/SignInNavbar';
import SignIn from './pages/signin-page/SignIn';
import SignUp from './pages/signup-page/SignUp';
import Home from './pages/home-page/home'
import CreateTopicPopup from './components/CreateTopicPopup';
import Profile from './pages/profile-page/Profile';
import EditProfile from './pages/edit-profile-page/EditProfile';
import FavDebateGallery from './pages/fav-debate-gallery/FavDebateGallery';
import EditPasswordPopup from './components/edit-user-password-popup/EditPasswordPopup';
import { BrowserRouter as  Router, Routes, Route ,  
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { AuthContext } from './context/authContext';
import EditProfileData from './pages/edit-profile-data-page/EditProfileData';
import { makeRequest } from './axios';
import DebateTopic from './pages/debate-topic-page/DebateTopic';
import DownloadRequestList from './pages/dataset-download-list/DownloadRequestList';
import EditCommentPopup from './components/topic-popup/EditTopicPopup';
import DownloadList from './pages/download-list-page/DownloadList';

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/signin"/>;
      
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile/:id",
      element: (
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      ),
    },
    {
      // (`/profile/${user}`)
      path: "profile/me",
      element: (
        <ProtectedRoute>
          <EditProfile/>
        </ProtectedRoute>
      ),
    },
    {
      path: "profile/me/edit",
      element: (
        <ProtectedRoute>
          <EditProfileData/>
        </ProtectedRoute>
      ),
    },
    {
      path: "profile/me/changepassword",
      element: (
        <ProtectedRoute>
          <EditPasswordPopup/>
        </ProtectedRoute>
      ),
    },
    {
      path : "/topic/:id",
      element: (
        <ProtectedRoute>
          <DebateTopic/>
        </ProtectedRoute>
      ),
    },
    {
      path : "/fav",
      element: (
        <ProtectedRoute>
          <FavDebateGallery/>
        </ProtectedRoute>
      ),
    },
    {
      path : "/downloadrequest",
      element: (
        <ProtectedRoute>
          <DownloadRequestList/>
        </ProtectedRoute>
      ),
    },
    {
      path : "/historydownload",
      element: (
        <ProtectedRoute>
          <DownloadList/>
        </ProtectedRoute>
      ),
    },
    {
      path: "/signin",
      element: <SignIn/>,
    },
    {
      path: "/signup",
    element: <SignUp/>,
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
