import React from 'react'
import SignInNavbar from '../../components/Navbar/SignInNavbar'
import './SignIn.css'
import signinImg from '../../assets/signup.png'


function SignIn() {
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
              <div className='signin-form-container'>
                <p class="sigin-label">อีเมล</p>
                <input type="email" name="email" class="signin-textfield" />
                <p class="sigin-label">รหัสผ่าน</p>
                <input type="password" name="password" class="signin-textfield" />
                {/* buttone div */}
                <div className='signin-button-container'>
                  <button class="signin-button">เข้าสู่ระบบ</button>
                </div>
                <a href="#">ลืมรหัสผ่าน</a>
              </div>
            </div>
        </div>

      </div>
    </>
  )
}

export default SignIn