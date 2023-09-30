import React ,{useContext, useState}from 'react'
import SignInNavbar from '../../components/Navbar/SignInNavbar'
import './SignIn.css'
import signinImg from '../../assets/signup.png'
import axios from 'axios'
import { AuthContext } from '../../context/authContext'

function SignIn() {

  const [inputs,setInputs] = useState({
    user_email:"",
    user_password:"",
  });
  const handleChange = (e) => {
    setInputs((prev)=>({ ...prev, [e.target.name]:e.target.value}))
  };
  const [err, SetErr] = useState(null);

  // const { login } = useContext(AuthContext);

  const login_button = async (e) => {
    e.preventDefault();
    try { console.log("t")
      // await login(inputs);
    } catch (err) {
      SetErr(err.response.data);
      alert(err.response.data);
    }
  };

  return (
    <>
      {/* Navbar */}
      <SignInNavbar/>
      {/* Page container  */}
      <div className='signin-container'>
          {/* flex */}
          <div className='signin-flex'>
            {/* image container */}
            <div className='signin-left-container'>
              <img src={signinImg}/>
            </div>
            {/* right container */}
            <div className='signin-right-container'>
              {/* heading text */}
              <h1 class="signin-title">เข้าสู่ระบบ</h1>
              {/* form container */}
              <form onSubmit={login_button} >
              <div className='signin-form-container'>
                <p class="sigin-label">อีเมล</p>
                <input type="email" class="signin-textfield" name="user_email" id="exampleInputEmail1" aria-describedby="emailHelp"onChange={handleChange} required/>
                <p class="sigin-label">รหัสผ่าน</p>
                <input type="password" class="signin-textfield" name="user_password" onChange={handleChange} required/>
                {/* buttone div */}
                <div className='signin-button-container'>
                  <button class="signin-button">เข้าสู่ระบบ</button>
                </div>
                <a href="#">ลืมรหัสผ่าน</a>
              </div>
              </form>
            </div>
        </div>

      </div>
    </>
  )
}

export default SignIn