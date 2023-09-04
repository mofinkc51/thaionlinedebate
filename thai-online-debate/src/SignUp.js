import React from 'react'
import './SignUp.css'
import image from './images/signup.png'
// import {Link} from "react-router-dom";


function SignUp() {
  return (
    <div>
        {/* <!-- Navbar is here --> */}
        <section class="navbar">
            <div class="logo">
                <h1>TDbate</h1>
            </div>
            <ul>
                <li><a href="">หน้าแรก</a></li>
                <li><a href="">เข้าสู่ระบบ</a></li>
            </ul>

        </section>
        {/* <!-- Navbar is here --> */}

        <header>
        
            <div class="middle-box">
                {/* <!-- left side image --> */}
                <div class="img-box">
                    <img src={image} alt="" />
                </div>

                {/* Title */}
                <div class="input-box">
                    <h1 class="input-title">ลงทะเบียน</h1>

                {/* input form */}
                <form action="#">
                    <p class="input-label">ชื่อบัญชีผู้ใช้</p>
                    <input type="text" name="username" class="textfield" placeholder="ชื่อบัญชีผู้ใช้" />
                    <p class="input-label">อีเมล</p>
                    <input type="email" name="email" class="textfield" placeholder="อีเมล" />
                    <p class="input-label">เบอร์โทรศัพท์</p>
                    <input type="tel" name="phonenum" class="textfield" placeholder="เบอร์โทรศัพท์" />
                    <p class="input-label">รหัสผ่าน</p>
                    <input type="password" name="password" class="textfield" placeholder="รหัสผ่าน" />
                    <p class="input-label">ยืนยันรหัสผ่าน</p>
                    <input type="password" name="confirmpassword" class="textfield" placeholder="ยืนยันรหัสผ่าน" />
                    <br/>
                </form>
                {/* check box  */}
                <div class="checkbox-box">
                    <input type="checkbox" name="" />
                    <label for="">ยอมรับข้อตกลงการใช้บริการ</label>
                </div>

                {/* button box */}
                <div class="button-signup-box">
                    <button class="button-register">
                        ลงทะเบียน
                    </button>

                </div>
                </div>


            </div>
        
        </header>    

    </div>
  )
}

export default SignUp