import './EditProfile.css'
import UserNavBar from '../../components/Navbar/UserNavBar'
import profileImg from '../../assets/profile.png'
import React, { useContext, useState, useRef, Suspense } from "react";
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import { userPicPath } from '../../userPicPath';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditProfile() {
    const { currentUser } = useContext(AuthContext);
    const navigator = useNavigate();
    const logout_db = async () => {
        await makeRequest.post("/auth/logout", "");
        localStorage.removeItem("user");
        localStorage.removeItem('downloadList');
        navigator("/signin");
    }
      const suspendedUser = async () => {
          try {
            const res = await makeRequest.put(`/auth/suspend`);
            Swal.fire({
              icon: "success",
              title: "ระงับบัญชีสําเร็จ",
            })
            logout_db()
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: err.response.data,
            })
          }
          
      }
      
      const suspendedClick = () => {
        Swal.fire({
          title: "คุณต้องการระงับบัญชีผู้ใช้ใช่หรือไม่",
          text: 'กรุณายืนยันการระงับบัญชี: กรอกคำว่า "ระงับบัญชี" หากต้องการระงับบัญชีนี้',
          icon: "warning",
          iconColor: "red",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          confirmButtonColor: "red",
          cancelButtonText: "ยกเลิก",
          showLoaderOnConfirm: true,
          preConfirm: (inputValue) => {
            if (inputValue !== "ระงับบัญชี") {
              Swal.showValidationMessage(`ข้อความที่กรอกไม่ตรงกับ "ระงับบัญชี"`);
            } else {
              suspendedUser();
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      };
  return (
    <>
    <UserNavBar/>
    <div className="edit-profile-page-container">
        <div className="edit-profile-box">
            <div className="edit-profile-box-container">
                <h2>ข้อมูลส่วนตัว</h2>
                {/* profile img label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>รูปภาพโปรโฟล์</p>
                </div>

                {/* image row */}              
                <div className="edit-profile-profile-image-row">
                    <img src={userPicPath+currentUser.user_pic} className='edit-profile-profile-img' />
                    {/* <p className='edit-profile-profile-img-desc'>ไฟล์นามสกุล jpg, png <br/>ขนาดไฟล์ไม่เกิน 2 MB </p> */}
                </div>

                {/* username label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>ชื่อบัญชีผู้ใช้</p>
                    <a href='me/edit' className='edit-profile-edit-button'>แก้ไข</a>
                    {/* <button className='edit-profile-edit-button'>แก้ไข</button> */}
                </div>
                <p className='edit-profile-profile-data'>{currentUser.user_name}</p>

                {/* phonenum label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>เบอร์โทรศัพท์</p>
                    {/* <button className='edit-profile-edit-button'>แก้ไข</button> */}
                </div>
                <p className='edit-profile-profile-data'>{currentUser.user_phonenum}</p>

                {/* email label row */}
                <div className="edit-profile-profile-label-row">
                    <p className='edit-profile-data-label'>อีเมล</p>
                </div>
                <p>{currentUser.user_email}</p>
                
                {/* password label row */}
                <div className="edit-profile-profile-label-row">
                    {/* <p className='edit-profile-data-label'>รหัสผ่าน</p> */}
                    {/* <button className='edit-profile-edit-button'>เปลี่ยนรหัสผ่าน</button> */}
                </div>
                <div className='edit-profile-suspend-row'>
                <button
                type="button"
                onClick={suspendedClick}
                className="edit-profile-suspend-button"
                >
                ระงับบัญชีผู้ใช้งาน
                </button>
                </div>

            </div>
        </div>


    </div>
    </>
  )
}

export default EditProfile