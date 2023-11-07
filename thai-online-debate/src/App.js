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
import { BrowserRouter as  Router, Routes, Route , Switch, 
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { AuthContext } from './context/authContext';
import EditProfileData from './pages/edit-profile-data-page/EditProfileData';
import { makeRequest } from './axios';
import DebateTopic from './pages/debate-topic-page/DebateTopic';
import DownloadRequestList from './pages/dataset-download-list/DownloadRequestList';
import AdminDownloadRequestList from './pages/admin-menu-page/AdminDownloadRequestList';
import AdminManageActivity from './pages/admin-menu-page/AdminManageActivity';
import AdminManageActivityRow from './components/admin-manage-activity-row/AdminManageActivityRow';
import AdminManageUser from './pages/admin-menu-page/AdminManageUser';
import AdminManageUserRow from './components/admin-manage-user-row/AdminManageUserRow';
import AdminManageProblem from './pages/admin-menu-page/AdminManageProblem';
import AdminManageProblemRow from './components/admin-manage-problem-row/AdminManageProblemRow';
import AdminManageRequest from './pages/admin-menu-page/AdminManageRequest';
import AdminManageRequestRow from './components/admin-manage-request-row/AdminManageRequestRow';
import AdminSidemenu from './components/admin-sidemenu/AdminSidemenu';
import AdminMenu from './pages/admin-menu-page/AdminMenu';
import AdminNavBar from './components/Navbar/AdminNavBar';
import EditCommentPopup from './components/topic-popup/EditTopicPopup';
import DownloadList from './pages/download-list-page/DownloadList';

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
    if (!currentUser ) {
      return <Navigate to="/signin"/>;
      
    }
    return children;
  };
  
  const AdminRoute = ({ children }) => {
    if (currentUser.role_id === "admin ") { 
      return <Navigate to="/"/>;
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
    },
    {
      path: "/manage/downloadrequest",
      element: (
        <AdminRoute>
          <AdminDownloadRequestList/>
        </AdminRoute>
      ),
    },
    {
      path: "/manage/activity",
      element: (
        <AdminRoute>
          <AdminManageActivity/>
        </AdminRoute>
      ),
    },
    {
      path: "/manage/activity/row",
      element: (
        <AdminRoute>
          <AdminManageActivityRow/>
        </AdminRoute>
      ),
    },
    {
      path: "/manage/main/user",
      element: (
        <AdminRoute>
          <AdminManageUser/>
        </AdminRoute>
      ),
    },
    {
      path: "/manage/main/user/row",
      element: (
        <AdminRoute>
          <AdminManageUserRow/>
        </AdminRoute>
      ),
    },
    {
      path: "/manage/main/problem",
      element: (
        <AdminRoute>
          <AdminManageProblem/>
        </AdminRoute>
      ),
    },
    {
      path: "/manage/main/problem/row",
      element: (
        <AdminRoute>
          <AdminManageProblemRow/>
        </AdminRoute>
      ),
    },
    {
      path: "/manage/main/request",
      element: (
        <AdminRoute>
          <AdminManageRequest/> 
        </AdminRoute>
      ),
    },
    {
      path: "/manage/main/request/row",
      element: (
        <AdminRoute>
          <AdminManageRequestRow/>
        </AdminRoute>
      ),
    },
    {
      path: "/manage/main",
      element: (
        <AdminRoute>
          <AdminMenu/>
        </AdminRoute>
      ),
    },
  ]);

  

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
