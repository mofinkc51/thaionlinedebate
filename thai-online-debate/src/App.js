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
import { AuthContextProvider } from './context/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/debate-topic" element={<DebateTopic/>}/>
            <Route path="/create-topic-popup" element={<CreateTopicPopup/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';edit-profile" element={<EditProfile/>}/>
            <Route path="/fav-debate-gallery" element={<FavDebateGallery/>}/>
          </Routes>
        </div>
      </Router>
      {/* <UserNavBar/> */}
      {/* <RegisterNavbar/> */}
      {/* <SignInNavbar/> */}
      {/* <SignIn/> */}
      {/* <SignUp/> */}
      {/* <Home/> */}
      {/* <CreateTopicPopup/> */}
      {/* <Profile/> */}
      {/* <EditProfile/> */}
      {/*<FavDebateGallery/>*/}
    </AuthContextProvider>
  );
}

export default App;
