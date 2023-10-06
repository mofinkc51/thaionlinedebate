import logo from './logo.svg';
import { useContext } from "react";
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
import { BrowserRouter as  Router, Routes, Route ,  
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { AuthContext } from './context/authContext';

function App() {

  const { currentUser } = useContext(AuthContext);


  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/signin"/>;
      
    }
    var user = currentUser.user_name;
    return children;
  };

  var user = "";
  if (currentUser) {
    user = currentUser.user_name;
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
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      ),
    },
    {
      //+ currentUser.user_name
      path: (`/profile/${user}`),
      element: (
        <ProtectedRoute>
          <EditProfile/>
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
