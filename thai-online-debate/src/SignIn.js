import React from 'react'
import './SignIn.css'
import image from './images/signup.png'


function onClickSignIn(){
    alert("Sign In")
}

function SignIn() {
  return (
    <div>
        {/* <!-- Navbar is here --> */}
        <section class="navbar">
            <div class="logo">
                <h1>TDbate</h1>
            </div>
            <ul>
                <li><a href="">หน้าแรก</a></li>
                <li><a href="">ลงทะเบียน</a></li>

            </ul>

        </section>
        {/* <!-- Navbar is here --> */}
        <header>
            <div class="middle-box">
                <div class="img-box">
                    <img src={image} />
                </div>
                
                <div class="input-box">
                    
                    <h1 class="input-title">เข้าสู่ระบบ</h1>
                    
                        
                        <p class="input-label">อีเมล</p>
                        <input type="email" name="email" class="textfield" />
                    
                        <p class="input-label">รหัสผ่าน</p>
                        <input type="password" name="password" class="textfield" />
                    
                    
                    <div class="button-signin-box">
                        <div>
                        <button class="button-register">
                            เข้าสู่ระบบ
                        </button>
                        </div>
                        <div>
                            <a href="#">ลืมรหัสผ่าน</a>
                        </div>
                    </div>
                    
                    
                
        
                </div>
            </div>
        </header>
    
    </div>
  )
}

export default SignIn