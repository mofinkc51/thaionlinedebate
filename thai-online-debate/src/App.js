import logo from './logo.svg';
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
import DebateTopic from './pages/debate-topic-page/DebateTopic';

function App() {
  return (
    <>
      {/* <UserNavBar/> */}
      {/* <RegisterNavbar/> */}
      {/* <SignInNavbar/> */}
      {/* <SignIn/> */}
      {/* <SignIn/> */}
      {/* <Home/> */}
      {/* <CreateTopicPopup/> */}
      {/* <Profile/> */}
      {/* <EditProfile/> */}
      {/* <FavDebateGallery/> */}
      <DebateTopic/>
      
      
      
    </>
  );
}

export default App;
