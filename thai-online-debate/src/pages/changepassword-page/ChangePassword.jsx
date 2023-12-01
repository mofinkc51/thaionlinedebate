import React ,{useContext, useEffect, useState}from 'react'
import SignInNavbar from '../../components/Navbar/SignInNavbar'
import './ChangePassword.css'
import signinImg from '../../assets/signup.png'
import { AuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Footer from '../../components/footer/Footer'
import { makeRequest } from '../../axios'
import { password_validation } from '../../checked'
function ChangePassword(props) {  
  
  const navigate = useNavigate();
  const [err, SetErr] = useState(null);
  const [inputs,setInputs] = useState({
    new_password: '',
    confirm_password: '',
  });
  const handleChange = (e) => {
    setInputs((prev)=>({ ...prev, [e.target.name]:e.target.value}))
  };
  const changepassword = async (e) => {
    e.preventDefault();
    if (inputs.new_password !== inputs.confirm_password) {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'รหัสผ่านไม่ตรงกัน'
        }).then(() => {
            document.getElementsByName('confirm_password')[0].focus();
        });
    }
    if (!password_validation(inputs.new_password, 5, 20)) {
        return document.getElementsByName('new_password')[0].focus();
    } else {
        try {
            await makeRequest.post(`/auth/reset-password/${props.token}`, inputs)
            Swal.fire({
                icon: 'success',
                title: 'เปลี่ยนรหัสผ่านสำเร็จ',
            }).then(() => {
                navigate("/signin");
            })
        } catch(err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data
            })
        }
    }
    console.log(inputs)
}

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
              <h1 class="signin-title">ตั้งรหัสผ่านใหม่</h1>
              {/* form container */}
              <form onSubmit={changepassword}>
              <div className='signin-form-container'>
                <p class="sigin-label">กรุณากรอกรหัสผ่านใหม่</p>
                <input type="password" className="resetpass-textfield" name="new_password" onChange={handleChange} required/>
                <p class="sigin-label">ยืนยันรหัสผ่าน</p>
                <input type="password" className="signin-textfield" name="confirm_password" onChange={handleChange} required/>
                {/* buttone div */}
                <div className='signin-button-container'>
                  <button class="signin-button">เปลี่ยนรหัสผ่าน</button>
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

export default ChangePassword;
