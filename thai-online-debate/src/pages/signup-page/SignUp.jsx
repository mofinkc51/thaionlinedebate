import React,{ useState }from 'react'
import RegisterNavbar from '../../components/Navbar/RegisterNavbar'
import './SignUp.css'
import signupImg from '../../assets/signup.png'
import axios from 'axios';
import { email_validation, user_validation, phone_validation } from '../../checked';
import Swal from 'sweetalert2';

function SignUp() {
  const [inputs,setInputs] = useState({
    user_name:"",
    user_email:"",
    user_phonenum:"",
    user_password:"",
    confirmpassword:"",
  });

  const handleChange = (e) => {
      setInputs((prev)=>({ ...prev, [e.target.name]:e.target.value}));
  };
  console.log(inputs)

  const [error, SetErr] = useState(null);


  const regis_button = async (e) => {
        e.preventDefault();
      const {confirmpassword, ...inputsDb}  = inputs;

      if (!user_validation(inputs.user_name,5,15)){
          return document.getElementsByName('user_name')[0].focus();
      }
      if (!email_validation(inputs.user_email)){
          return document.getElementsByName('user_email')[0].focus();
      }
      if (!phone_validation(inputs.user_phonenum)){
          return document.getElementsByName('user_phonenum')[0].focus();
      }
      if (!user_validation(inputs.user_password,5,15)){
          return document.getElementsByName('user_password')[0].focus();
      }

      if (inputs.confirmpassword !== inputs.user_password) {
          return Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:("password not match")
          });
      
      } else {
          e.preventDefault();
          try {
              await axios.post("http://localhost:8800/api/auth/register", inputsDb)
          } catch (err) {
              SetErr(err.response.data)
              Swal.fire({
                  icon: 'error',
                  title: error,
              })
          }
          //console.log("you tick toog and correct password");
      }
  };

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
                <form onSubmit={regis_button}>
                <p class="signup-label">ชื่อบัญชีผู้ใช้</p>
                    <input type="text" name="user_name" onChange={handleChange} class="signup-textfield" placeholder="ชื่อบัญชีผู้ใช้" required/>
                    <p class="signup-label">อีเมล</p>
                    <input type="email" name="user_email" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} class="signup-textfield" placeholder="อีเมล" required/>
                    <p class="signup-label">เบอร์โทรศัพท์</p>
                    <input type="number" name="user_phonenum" min ="0" maxlength="10"  onChange={handleChange} class="signup-textfield" placeholder="เบอร์โทรศัพท์" />
                    <p class="signup-label">รหัสผ่าน</p>
                    <input type="password" name="user_password" onChange={handleChange} class="signup-textfield" placeholder="รหัสผ่าน" required/>
                    <p class="signup-label">ยืนยันรหัสผ่าน</p>
                    <input type="password" name="confirmpassword" onChange={handleChange} class="signup-textfield" placeholder="ยืนยันรหัสผ่าน" required/>
                    {/* check box div */}
                    <div className='checkbox-signup-container'>
                        <input type="checkbox" value="accept" name="checkbox1" id="checkbox1" required/>
                        <label for="checkbox-singup">  ยอมรับข้อตกลงการใช้บริการ</label><br/>
                        <a href="#">ข้อตกลงการใช้บริการ</a>
                    </div>
                    {/* buttone div */}
                    <div className='signup-button-container'>
                        <button class="signup-button" >ลงทะเบียน</button>
                    </div>
                </form>
                <div className='signup-form-container'>
 
                </div>
            </div>
        </div> 
        
    </div>
    </>
  )
}

export default SignUp