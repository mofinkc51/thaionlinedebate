import React, { useContext, useState } from "react";
import RegisterNavbar from "../../components/Navbar/RegisterNavbar";
import "./SignUp.css";
import signupImg from "../../assets/signup.png";
import axios from "axios";
import {
  email_validation,
  user_validation,
  phone_validation,
  password_validation,
} from "../../checked";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import Footer from "../../components/footer/Footer";

function SignUp() {
  const [inputs, setInputs] = useState({
    user_name: "",
    user_email: "",
    user_phonenum: "",
    user_password: "",
    confirmpassword: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [error, SetErr] = useState(null);

  const regis_button = async (e) => {
    e.preventDefault();
    const { confirmpassword, ...inputsDb } = inputs;

    if (!user_validation(inputs.user_name, 5, 15)) {
      return document.getElementsByName("user_name")[0].focus();
    }
    if (!email_validation(inputs.user_email)) {
      return document.getElementsByName("user_email")[0].focus();
    }
    if (!phone_validation(inputs.user_phonenum)) {
      return document.getElementsByName("user_phonenum")[0].focus();
    }
    if (!password_validation(inputs.user_password, 5, 20)) {
      return document.getElementsByName("user_password")[0].focus();
    }
    if (inputs.confirmpassword !== inputs.user_password) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "password not match",
      });
    } else {
      e.preventDefault();
      try {
        await makeRequest.post("/auth/register", inputsDb);
        Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกเรียบร้อย",
        }).then(() => login(inputs).then(() => navigate("/")));
      } catch (err) {
        SetErr(err.response.data);
        Swal.fire({
          icon: "error",
          title: err.response.data,
        });
      }
    }
  };

  return (
    <>
      {/* Navbar */}
      <RegisterNavbar />
      {/* page container */}
      <div className="signup-container">
        <div className="signup-flex">
          {/* image container */}
          <div className="signup-left-container">
            <img className="signup-img" src={signupImg} />
          </div>
          {/* right container */}
          <div className="signup-right-container">
            {/* heading text */}
            <h1 class="signup-title">ลงทะเบียน</h1>
            {/* form container */}
            <form onSubmit={regis_button}>
              <p class="signup-label">ชื่อบัญชีผู้ใช้</p>
              <input
                type="text"
                name="user_name"
                onChange={handleChange}
                class="signup-textfield"
                placeholder="ชื่อบัญชีผู้ใช้"
                required
              />
              <p class="signup-label">อีเมล</p>
              <input
                type="email"
                name="user_email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleChange}
                class="signup-textfield"
                placeholder="อีเมล"
                required
              />
              <p class="signup-label-phone">เบอร์โทรศัพท์</p>
              <input
                type="number"
                name="user_phonenum"
                min="0"
                maxlength="10"
                onChange={handleChange}
                class="signup-textfield"
                placeholder="เบอร์โทรศัพท์"
              />
              <div className="signup-dob-reli-row">
                <div>
                  <p class="signup-label">วันเดือนปีเกิด</p>
                  <input type="date" id="birthday" name="birthday" className="signup-birthday-input"></input>
                </div>

                <div>
                  <p class="signup-label">เพศ</p>
                  <select name="province" className="signup-gender-input">
                    <option value="" selected>เลือกเพศ</option>
                    <option value="ชาย">เพศชาย</option>
                    <option value="หญิง">เพศหญิง</option>
                    <option value="ไม่ระบุ">ไม่ระบุ</option>
                  </select>
                </div>
                
              </div>

              {/*  */}

              <div className="signup-dob-reli-row">
                  <div>
                  <p class="signup-label">ศาสนา</p>
                    <select name="province" className="signup-reli-input">
                      <option value="" selected>เลือกศาสนา</option>
                      <option value="ศาสนาพุทธ">ศาสนาพุทธ</option>
                      <option value="ศาสนาอิสลาม">ศาสนาอิสลาม</option>
                      <option value="ศาสนาคริสต์">ศาสนาคริสต์</option>
                      <option value="ศาสนาอื่น ๆ">ศาสนาอื่น ๆ</option>
                    </select>
                  </div>
                  <div>
                  <p class="signup-label">จังหวัด</p>
              <select name="province" className="signup-province-input">
                <option value="" selected>เลือกจังหวัด</option>
                <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                <option value="กระบี่">กระบี่ </option>
                <option value="กาญจนบุรี">กาญจนบุรี </option>
                <option value="กาฬสินธุ์">กาฬสินธุ์ </option>
                <option value="กำแพงเพชร">กำแพงเพชร </option>
                <option value="ขอนแก่น">ขอนแก่น</option>
                <option value="จันทบุรี">จันทบุรี</option>
                <option value="ฉะเชิงเทรา">ฉะเชิงเทรา </option>
                <option value="ชัยนาท">ชัยนาท </option>
                <option value="ชัยภูมิ">ชัยภูมิ </option>
                <option value="ชุมพร">ชุมพร </option>
                <option value="ชลบุรี">ชลบุรี </option>
                <option value="เชียงใหม่">เชียงใหม่ </option>
                <option value="เชียงราย">เชียงราย </option>
                <option value="ตรัง">ตรัง </option>
                <option value="ตราด">ตราด </option>
                <option value="ตาก">ตาก </option>
                <option value="นครนายก">นครนายก </option>
                <option value="นครปฐม">นครปฐม </option>
                <option value="นครพนม">นครพนม </option>
                <option value="นครราชสีมา">นครราชสีมา </option>
                <option value="นครศรีธรรมราช">นครศรีธรรมราช </option>
                <option value="นครสวรรค์">นครสวรรค์ </option>
                <option value="นราธิวาส">นราธิวาส </option>
                <option value="น่าน">น่าน </option>
                <option value="นนทบุรี">นนทบุรี </option>
                <option value="บึงกาฬ">บึงกาฬ</option>
                <option value="บุรีรัมย์">บุรีรัมย์</option>
                <option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์ </option>
                <option value="ปทุมธานี">ปทุมธานี </option>
                <option value="ปราจีนบุรี">ปราจีนบุรี </option>
                <option value="ปัตตานี">ปัตตานี </option>
                <option value="พะเยา">พะเยา </option>
                <option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา </option>
                <option value="พังงา">พังงา </option>
                <option value="พิจิตร">พิจิตร </option>
                <option value="พิษณุโลก">พิษณุโลก </option>
                <option value="เพชรบุรี">เพชรบุรี </option>
                <option value="เพชรบูรณ์">เพชรบูรณ์ </option>
                <option value="แพร่">แพร่ </option>
                <option value="พัทลุง">พัทลุง </option>
                <option value="ภูเก็ต">ภูเก็ต </option>
                <option value="มหาสารคาม">มหาสารคาม </option>
                <option value="มุกดาหาร">มุกดาหาร </option>
                <option value="แม่ฮ่องสอน">แม่ฮ่องสอน </option>
                <option value="ยโสธร">ยโสธร </option>
                <option value="ยะลา">ยะลา </option>
                <option value="ร้อยเอ็ด">ร้อยเอ็ด </option>
                <option value="ระนอง">ระนอง </option>
                <option value="ระยอง">ระยอง </option>
                <option value="ราชบุรี">ราชบุรี</option>
                <option value="ลพบุรี">ลพบุรี </option>
                <option value="ลำปาง">ลำปาง </option>
                <option value="ลำพูน">ลำพูน </option>
                <option value="เลย">เลย </option>
                <option value="ศรีสะเกษ">ศรีสะเกษ</option>
                <option value="สกลนคร">สกลนคร</option>
                <option value="สงขลา">สงขลา </option>
                <option value="สมุทรสาคร">สมุทรสาคร </option>
                <option value="สมุทรปราการ">สมุทรปราการ </option>
                <option value="สมุทรสงคราม">สมุทรสงคราม </option>
                <option value="สระแก้ว">สระแก้ว </option>
                <option value="สระบุรี">สระบุรี </option>
                <option value="สิงห์บุรี">สิงห์บุรี </option>
                <option value="สุโขทัย">สุโขทัย </option>
                <option value="สุพรรณบุรี">สุพรรณบุรี </option>
                <option value="สุราษฎร์ธานี">สุราษฎร์ธานี </option>
                <option value="สุรินทร์">สุรินทร์ </option>
                <option value="สตูล">สตูล </option>
                <option value="หนองคาย">หนองคาย </option>
                <option value="หนองบัวลำภู">หนองบัวลำภู </option>
                <option value="อำนาจเจริญ">อำนาจเจริญ </option>
                <option value="อุดรธานี">อุดรธานี </option>
                <option value="อุตรดิตถ์">อุตรดิตถ์ </option>
                <option value="อุทัยธานี">อุทัยธานี </option>
                <option value="อุบลราชธานี">อุบลราชธานี</option>
                <option value="อ่างทอง">อ่างทอง </option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
                  </div>
              </div>
              
              {/*  */}

              <p class="signup-label">รหัสผ่าน</p>
              <input
                type="password"
                name="user_password"
                onChange={handleChange}
                class="signup-textfield"
                placeholder="รหัสผ่าน"
                required
              />
              <p class="signup-label">ยืนยันรหัสผ่าน</p>
              <input
                type="password"
                name="confirmpassword"
                onChange={handleChange}
                class="signup-textfield"
                placeholder="ยืนยันรหัสผ่าน"
                required
              />
              {/* check box div */}
              <div className="checkbox-signup-container">
                <input
                  type="checkbox"
                  value="accept"
                  name="checkbox1"
                  id="checkbox1"
                  required
                />
                <label for="checkbox-singup"> ยอมรับข้อตกลงการใช้บริการ</label>
                <br />
                <a
                  href="https://pdpa.pro/policies/view/th/qaKroJW3nfKLKKQ9Bw2w2C5r"
                  target="_blank"
                >
                  ข้อตกลงการใช้บริการ
                </a>
              </div>
              {/* buttone div */}
              <div className="signup-button-container">
                <button class="signup-button">ลงทะเบียน</button>
                <a href="/signin">มีปัญชีอยู่แล้ว</a>
              </div>
            </form>
            <div className="signup-form-container"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
