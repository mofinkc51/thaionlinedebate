import logo from './logo.svg';
import React, { useContext, useEffect } from "react";
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
import AdminNavBar from './components/Navbar/AdminNavBar';
import AdminSidemenu from './components/admin-sidemenu/AdminSidemenu';


function App() {

  const { currentUser } = useContext(AuthContext);
  
  /*useEffect(() => {
    if (currentUser && currentUser.role_id === "admin") {
      console.log("Current user:ตรงกัน");
    }
    else{
      console.log("ไม่ตรงกัน")
    }
  }, [currentUser]);*/

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/signin"/>;
      
    }
    return children;
  };
  

  const AdminRoute = ({ children }) => {
    if (currentUser && currentUser.role_id === "admin") {
      return children;
    }
    return <Navigate to="/signin"/>;
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
      path: "/profile",
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
      element: <EditPasswordPopup/>
    },
    {
      path: "/signin",
      element: <SignIn/>,
    },
    {
      path: "/signup",
    element: <SignUp/>,
    },
    {
      path : "/topic/:id",
      element : <DebateTopic/>,
    },
    {
      path : "/fav",
      element : <FavDebateGallery/>,
    },
    {
      path : "/downloadrequest",
      element : <DownloadRequestList/>,
    },
  
    
  ]);

  

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
