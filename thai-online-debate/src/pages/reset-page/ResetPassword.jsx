import React ,{useContext, useEffect, useState}from 'react'
import SignInNavbar from '../../components/Navbar/SignInNavbar'
import './ResetPassword.css'
import signinImg from '../../assets/signup.png'
import { AuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Footer from '../../components/footer/Footer'
import { makeRequest } from '../../axios'
import RegisterNavbar from '../../components/Navbar/RegisterNavbar'
function ResetPassword() {  
  
  const navigate = useNavigate();
  const [err, SetErr] = useState(null);
  const [inputs,setInputs] = useState({
    user_email:""
  });
  const handleChange = (event) => {
    setInputs(event.target.value);
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const sendEmail = async (event) => {
    event.preventDefault();
    setIsButtonDisabled(true);

    try {
      console.log(inputs)
      await makeRequest.post("/auth/reset-password", {user_email:inputs});
      Swal.fire({
        icon: 'success',
        title: 'ส่งอีเมลลืมรหัสผ่านเรียบร้อยแล้ว',
        showConfirmButton: false
      })
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 30000);
    } catch (err) {
     SetErr(err.response.data);
     Swal.fire({
       icon: 'error',
       title: err.response.data,
     })
    
  };
  }
  return (
    <>
      {/* Navbar */}
      <RegisterNavbar/>
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
              <h1 class="signin-title">ลืมรหัสผ่าน</h1>
              {/* form container */}
              <form onSubmit={sendEmail}>
              <div className='signin-form-container'>
                <p class="sigin-label">กรุณากรอกอีเมล</p>
                <input type="email" class="signin-textfield" name="user_email" id="exampleInputEmail1" aria-describedby="emailHelp"onChange={handleChange} required/>
                {/* buttone div */}
                <div className='signin-button-container'>
                  <button class="signin-button" disabled={isButtonDisabled}>ส่งลิงก์เปลี่ยนรหัสผ่าน</button>
                </div>
              </div>
              </form>
            </div>
        </div>

      </div>
      <Footer/>
    </>
  )
}

export default ResetPassword;
