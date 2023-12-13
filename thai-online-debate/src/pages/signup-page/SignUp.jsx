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
import validator from 'validator';
function SignUp() {
  const [inputs, setInputs] = useState({
    user_name: "",
    user_email: "",
    user_phonenum: "",
    user_password: "",
    confirmpassword: "",
    user_birthday: "",
    user_gender: "",
    user_religion: "",
    user_province: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
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
    if (validator.isDate(inputs.user_birthday) === false) {
      return document.getElementsByName("user_birthday")[0].focus();
    }
    if (validator.isEmpty(inputs.user_religion)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณาเลือกศาสนา",
      })
      return document.getElementsByName("user_religion")[0].focus();

    }
    if (validator.isEmpty(inputs.user_gender)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณาเลือกเพศ",
      })
      return document.getElementsByName("user_gender")[0].focus();
    }
    if (validator.isEmpty(inputs.user_province)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณาเลือกจังหวัด",
      })
      return document.getElementsByName("user_province")[0].focus();
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
        console.log(inputsDb);
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
  const arrayProvince = [
    "กรุงเทพมหานคร","กระบี่","กาญจนบุรี","กาฬสินธุ์","กำแพงเพชร","ขอนแก่น","จันทบุรี","ฉะเชิงเทรา","ชัยนาท","ชัยภูมิ","ชุมพร","ชลบุรี","เชียงใหม่","เชียงราย","ตรัง","ตราด","ตาก","นครนายก","นครปฐม","นครพนม","นครราชสีมา","นครศรีธรรมราช","นครสวรรค์","นราธิวาส","น่าน","นนทบุรี","บึงกาฬ","บุรีรัมย์","ประจวบคีรีขันธ์","ปทุมธานี","ปราจีนบุรี","ปัตตานี","พะเยา","พระนครศรีอยุธยา","พังงา","พิจิตร","พิษณุโลก","เพชรบุรี","เพชรบูรณ์","แพร่","พัทลุง","ภูเก็ต","มหาสารคาม","มุกดาหาร","แม่ฮ่องสอน","ยโสธร","ยะลา","ร้อยเอ็ด","ระนอง","ระยอง","ราชบุรี","ลพบุรี","ลำปาง","ลำพูน","เลย","ศรีสะเกษ","สกลนคร","สงขลา","สมุทรสาคร","สมุทรปราการ","สมุทรสงคราม","สระแก้ว","สระบุรี","สิงห์บุรี","สุโขทัย","สุพรรณบุรี","สุราษฎร์ธานี","สุรินทร์","สตูล","หนองคาย","หนองบัวลำภู","อำนาจเจริญ","อุดรธานี","อุตรดิตถ์","อุทัยธานี","อุบลราชธานี","อ่างทอง"  ]
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
            <h1 className="signup-title">ลงทะเบียน</h1>
            {/* form container */}
            <form onSubmit={regis_button}>
              <p className="signup-label">ชื่อบัญชีผู้ใช้</p>
              <input
                type="text"
                name="user_name"
                onChange={handleChange}
                className="signup-textfield"
                placeholder="ชื่อบัญชีผู้ใช้"
                required
              />
              <p className="signup-label">อีเมล</p>
              <input
                type="email"
                name="user_email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleChange}
                className="signup-textfield"
                placeholder="อีเมล"
                required
              />
              <p className="signup-label-phone">เบอร์โทรศัพท์</p>
              <input
                type="number"
                name="user_phonenum"
                min="0"
                maxLength="10"
                onChange={handleChange}
                className="signup-textfield"
                placeholder="เบอร์โทรศัพท์"
              />
              <div className="signup-dob-reli-row">
                <div>
                  <p className="signup-label">วันเดือนปีเกิด</p>
                  <input
                    type="date"
                    id="birthday"
                    name="user_birthday"
                    className="signup-birthday-input"
                    onChange={handleChange}
                  ></input>
                </div>

                <div>
                  <p className="signup-label">เพศ</p>
                  <select name="user_gender" className="signup-gender-input" onChange={handleChange}>
                    <option value="" defaultValue>
                      เลือกเพศ
                    </option>
                    <option value="ชาย" >เพศชาย</option>
                    <option value="หญิง" >เพศหญิง</option>
                    <option value="ไม่ระบุ" >ไม่ระบุ</option>
                  </select>
                </div>
              </div>

              {/*  */}

              <div className="signup-dob-reli-row">
                <div>
                  <p className="signup-label">ศาสนา</p>
                  <select name="user_religion" className="signup-reli-input" onChange={handleChange}>
                    <option value="" defaultValue>
                      เลือกศาสนา
                    </option>
                    <option value="ศาสนาพุทธ" >ศาสนาพุทธ</option>
                    <option value="ศาสนาคริสต์">ศาสนาคริสต์</option>
                    <option value="ศาสนาอิสลาม">ศาสนาอิสลาม</option>
                    <option value="ศาสนาอื่น ๆ">ศาสนาอื่น ๆ</option>
                  </select>
                </div>
                <div>
                  <p className="signup-label">จังหวัด</p>
                  <select name="user_province" className="signup-province-input" onChange={handleChange}>
                    <option value="" defaultValue>
                      เลือกจังหวัด
                    </option>
                    {arrayProvince.map((Province) => (
                      <option value={Province} key={Province} >{Province}</option>
                    ))}
                    <option value="อื่น ๆ" >อื่น ๆ</option>
                  </select>
                </div>
              </div>

              {/*  */}

              <p className="signup-label">รหัสผ่าน</p>
              <input
                type="password"
                name="user_password"
                onChange={handleChange}
                className="signup-textfield"
                placeholder="รหัสผ่าน"
                required
              />
              <p className="signup-label">ยืนยันรหัสผ่าน</p>
              <input
                type="password"
                name="confirmpassword"
                onChange={handleChange}
                className="signup-textfield"
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
                <label htmlFor="checkbox-singup"> ยอมรับข้อตกลงการใช้บริการ</label>
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
                <button className="signup-button">ลงทะเบียน</button>
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
