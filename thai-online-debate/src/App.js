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
  useParams,
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
import TagDebatePage from './pages/tag-debate-gallery/TagDebatePage';
import ResetPassword from './pages/reset-page/ResetPassword';
import ChangePassword from './pages/changepassword-page/ChangePassword';


function App() {

  const { currentUser } = useContext(AuthContext);
  
  const ProtectedRoute = ({ children }) => {
    if (!currentUser ) {
      return <Navigate to="/signin"/>;
      
    }
    return children;
  };
  
  function DebateTopicWrapper() {
    const { dbt_id } = useParams();
    return <DebateTopic dbt_id={dbt_id} />;
  }
  function TagDebatePageWrapper() {
    const { tagname } = useParams();
    return <TagDebatePage tagname={tagname} />;
  }

  function ProfileWrapper() {
    const { user_id } = useParams();
    return <Profile user_id={user_id} />;
  }
  function ForgotPasswordWrapper() {
    const { token } = useParams();
    return <ChangePassword token={token} />;
  }
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
      path: "/profile/:user_id",
      element: (
        <ProtectedRoute>
          <ProfileWrapper/>
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
      path : "/topic/:dbt_id",
      element: (
        <ProtectedRoute>
          <DebateTopicWrapper/>
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
      path : "/tag/:tagname",
      element: (
        <ProtectedRoute>
          <TagDebatePageWrapper/>
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
      path: "/forgot-password",
      element: <ResetPassword/>,
    },
    {
      path: "/reset-password/:token",
    element: <ForgotPasswordWrapper/>,
    },
    {
      path: "/manage/downloadrequest",
      element: (
         
          <AdminDownloadRequestList/>
         
      ),
    },
    {
      path: "/manage/activity",
      element: (
         
          <AdminManageActivity/>
         
      ),
    },
    {
      path: "/manage/activity/row",
      element: (
         
          <AdminManageActivityRow/>
         
      ),
    },
    {
      path: "/manage/main/user",
      element: (
         
          <AdminManageUser/>
         
      ),
    },
    {
      path: "/manage/main/user/row",
      element: (
         
          <AdminManageUserRow/>
         
      ),
    },
    {
      path: "/manage/main/problem",
      element: (
         
          <AdminManageProblem/>
         
      ),
    },
    {
      path: "/manage/main/problem/row",
      element: (
         
          <AdminManageProblemRow/>
         
      ),
    },
    {
      path: "/manage/main/request/:dr_id",
      element: (
         
          <AdminManageRequest/> 
         
      ),
    },
    {
      path: "/manage/main/request/row",
      element: (
         
          <AdminManageRequestRow/>
         
      ),
    },
    {
      path: "/manage/main",
      element: (
         
          <AdminMenu/>
         
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
