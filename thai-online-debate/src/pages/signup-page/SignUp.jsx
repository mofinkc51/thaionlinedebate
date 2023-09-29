import React from 'react'
import RegisterNavbar from '../../components/Navbar/RegisterNavbar'
import './SignUp.css'
import signupImg from '../../assets/signup.png'


function SignUp() {
  return (
    <>
    {/* Navbar */}
    <RegisterNavbar/>
    {/* page container */}
    <div className='signup-container'>
        <div className='signup-flex'>
            {/* image container */}
            <div className='signup-left-container'>
              <img src={signupImg}/>
            </div>
            {/* right container */}
            <div className='signup-right-container'>
                {/* heading text */}
                <h1 class="signup-title">ลงทะเบียน</h1>
                {/* form container */}
                <div className='signup-form-container'>
                <p class="signup-label">ชื่อบัญชีผู้ใช้</p>
                    <input type="text" name="username" class="signup-textfield" placeholder="ชื่อบัญชีผู้ใช้" />
                    <p class="signup-label">อีเมล</p>
                    <input type="email" name="email" class="signup-textfield" placeholder="อีเมล" />
                    <p class="signup-label">เบอร์โทรศัพท์</p>
                    <input type="tel" name="phonenum" class="signup-textfield" placeholder="เบอร์โทรศัพท์" />
                    <p class="signup-label">รหัสผ่าน</p>
                    <input type="password" name="password" class="signup-textfield" placeholder="รหัสผ่าน" />
                    <p class="signup-label">ยืนยันรหัสผ่าน</p>
                    <input type="password" name="confirmpassword" class="signup-textfield" placeholder="ยืนยันรหัสผ่าน" />
                    {/* check box div */}
                    <div className='checkbox-signup-container'>
                        <input type="checkbox" id="checkbox-singup" value="accept" />
                        <label for="checkbox-singup">  ยอมรับข้อตกลงการใช้บริการ</label><br/>
                        <a href="#">ข้อตกลงการใช้บริการ</a>
                    </div>
                    {/* buttone div */}
                    <div className='signup-button-container'>
                        <button class="signup-button">ลงทะเบียน</button>
                    </div>
                </div>
            </div>
        </div> 
        
    </div>
    </>
  )
}

export default SignUp