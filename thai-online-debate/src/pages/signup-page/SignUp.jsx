import React,{ useState }from 'react'
import RegisterNavbar from '../../components/Navbar/RegisterNavbar'
import './SignUp.css'
import signupImg from '../../assets/signup.png'
import axios from 'axios';

function SignUp() {
  const [inputs,setInputs] = useState({
    user_name:"",
    user_email:"",
    user_phonenum:"",
    user_password:"",
    confirmpassword:"",
  });

  const handleChange = (e) => {
      setInputs((prev)=>({ ...prev, [e.target.name]:e.target.value}))
  };
  console.log(inputs)

  const [err, SetErr] = useState(null);

  const checkedbox = () =>{
      const checkbox = document.querySelector('#checkbox1');
    
      if (checkbox.checked) {
        // checkbox ถูกติ๊ก
        return true;
      } else {
        // checkbox ไม่ถูกติ๊ก
        return false;
      }
  };

  /**
   * A function that handles the registration button click event.
   *
   * @param {Event} e - The event object representing the button click.
   * @return {Promise<void>} - A promise that resolves once the registration is complete.
   */
  const regis_button = async (e) => {

      const {confirmpassword, ...inputsDb}  = inputs;

      if (!checkedbox()) {
          return alert("please tick the checkbox")

      } else if (inputs.user_password === "") {
          return alert("please enter your password")

      } else if (inputs.confirmpassword !== inputs.user_password) {
          return alert("password not match")

      } else {
          e.preventDefault();
          try {
              await axios.post("http://localhost:8800/api/auth/register", inputsDb)
          } catch (err) {
              SetErr(err.response.data)
              alert(err.response.data)
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
                <form>
                <p class="signup-label">ชื่อบัญชีผู้ใช้</p>
                    <input type="text" name="user_name" onChange={handleChange} class="signup-textfield" placeholder="ชื่อบัญชีผู้ใช้" />
                    <p class="signup-label">อีเมล</p>
                    <input type="email" name="user_email" onChange={handleChange} class="signup-textfield" placeholder="อีเมล" />
                    <p class="signup-label">เบอร์โทรศัพท์</p>
                    <input type="tel" name="user_phonenum" onChange={handleChange} class="signup-textfield" placeholder="เบอร์โทรศัพท์" />
                    <p class="signup-label">รหัสผ่าน</p>
                    <input type="password" name="user_password" onChange={handleChange} class="signup-textfield" placeholder="รหัสผ่าน" />
                    <p class="signup-label">ยืนยันรหัสผ่าน</p>
                    <input type="password" name="confirmpassword" onChange={handleChange} class="signup-textfield" placeholder="ยืนยันรหัสผ่าน" />
                    {/* check box div */}
                    <div className='checkbox-signup-container'>
                        <input type="checkbox" value="accept" name="checkbox1" id="checkbox1" onClick={checkedbox} />
                        <label for="checkbox-singup">  ยอมรับข้อตกลงการใช้บริการ</label><br/>
                        <a href="#">ข้อตกลงการใช้บริการ</a>
                    </div>
                    {/* buttone div */}
                    <div className='signup-button-container'>
                        <button class="signup-button" onClick={regis_button}>ลงทะเบียน</button>
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